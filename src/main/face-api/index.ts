import { join } from 'path';
import * as faceapi from '@fsdk/face-api-node';
import { config } from '../config';

const assetsPath = join(config.assetsPath, 'ml');

export const initFaceAPI = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(assetsPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(assetsPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(assetsPath);
  await faceapi.nets.ageGenderNet.loadFromDisk(assetsPath);
};
