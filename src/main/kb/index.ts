import { join, resolve } from 'path';
import { Parser } from 'n3';
import { readFile } from 'fs/promises';
import { config } from '../config';
import { store } from './queries';

const assetsPath = join(config.assetsPath, 'kb');

export const initKB = async () => {
  const kbFilePath = resolve(assetsPath, 'kb.n3');
  const kb = await readFile(kbFilePath, { encoding: 'utf8' });
  store.addQuads(new Parser({ format: 'text/n3' }).parse(kb));
};
