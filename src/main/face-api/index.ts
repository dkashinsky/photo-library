import { resolve } from 'path';
import * as faceapi from '@fsdk/face-api-node';

const assetsPath = resolve(__dirname, '../../../assets/ml');

export const initFaceAPI = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(assetsPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(assetsPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(assetsPath);
};
