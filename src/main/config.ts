import { resolve } from 'path';

export const config = {
  useInMemoryStore: process.argv.includes('--in-memory-store'),
  useLocalhost: process.argv.includes('--localhost'),
  assetsPath: resolve(__dirname, '../../assets')
};
