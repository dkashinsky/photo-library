import { readFile } from 'fs/promises';
import * as tf from '@tensorflow/tfjs-node';
import * as faceapi from '@fsdk/face-api-node';

const isTensor3D = (tensor: tf.Tensor3D | tf.Tensor4D): tensor is tf.Tensor3D => {
  return tensor.shape.length === 3;
}

const detectionOptions = new faceapi.SsdMobilenetv1Options({});

export const detectFaces = async (filePath: string) => {
  const buffer = await readFile(filePath);

  const image = tf.node.decodeImage(buffer);
  let extended: tf.Tensor4D = isTensor3D(image)
    ? tf.expandDims(image)
    : image;

  const detections = await faceapi.detectAllFaces(extended, detectionOptions)
    .run();

  image.dispose();
  extended.dispose();

  return detections;
};
