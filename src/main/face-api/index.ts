import { resolve } from 'path';
import * as faceapi from '@fsdk/face-api-node';

const assetsPath = resolve(__dirname, '../../../assets');

export const initFaceAPI = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(assetsPath);
};
