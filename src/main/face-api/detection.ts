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

  return detections;
};
