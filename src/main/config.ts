export const config = {
  useInMemoryStore: process.argv.includes('--in-memory-store'),
  useLocalhost: process.argv.includes('--localhost'),
};
