import { readFile } from 'fs/promises';
import * as tf from '@tensorflow/tfjs-node';
import * as faceapi from '@fsdk/face-api-node';

const detectionOptions = new faceapi.SsdMobilenetv1Options({});

export const detectFaces = async (filePath: string) => {
  const buffer = await readFile(filePath);

  const image = tf.node.decodeImage(buffer, 3, 'int32', false);

  const detections = await faceapi
    .detectAllFaces(image, detectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptors()
    .run();

  image.dispose();

  return detections.map(detection => ({
    ...detection,
    descriptor: Array.from(detection.descriptor),
  }));
};

export const matchFaces = (
  faceDescriptor: number[],
  referenceData: Record<string, number[][]>,
) => {
  const labeledDescriptors = Object.keys(referenceData).map(personId => {
    const descriptors = referenceData[personId].map(descriptor => new Float32Array(descriptor));
    return new faceapi.LabeledFaceDescriptors(personId, descriptors);
  });
  const matcher = new faceapi.FaceMatcher(labeledDescriptors);
  const match = matcher.matchDescriptor(new Float32Array(faceDescriptor));


  return match.distance < matcher.distanceThreshold
    ? { personId: match.label, distance: match.distance }
    : null;
};
