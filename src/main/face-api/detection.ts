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

// Person matcher. Works as a wrapper around faceapi.FaceMatcher without throwing on empty input
export class PersonMatcher {
  private matcher: faceapi.FaceMatcher | null = null;

  constructor(refData: Record<string, number[][]>) {
    const labeledDescriptors = Object.keys(refData).map(personId => {
      const descriptors = refData[personId].map(descriptor => new Float32Array(descriptor));
      return new faceapi.LabeledFaceDescriptors(personId, descriptors);
    });

    // only instantiate matcher when there are reference descriptors
    if (labeledDescriptors.length) {
      this.matcher = new faceapi.FaceMatcher(labeledDescriptors);
    }
  }

  matchDescriptor(faceDescriptor: number[]) {
    if (!this.matcher) {
      // silently return null as there is nothing to match with
      return null;
    }

    const match = this.matcher.matchDescriptor(new Float32Array(faceDescriptor));

    return match.distance < this.matcher.distanceThreshold
      ? { personId: match.label, distance: match.distance }
      : null;
  }
}

export const matchFace = (
  faceDescriptor: number[],
  referenceData: Record<string, number[][]>,
) => {
  return new PersonMatcher(referenceData).matchDescriptor(faceDescriptor);
};
