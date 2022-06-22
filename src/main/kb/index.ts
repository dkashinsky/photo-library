import { join, resolve } from 'path';
import { Parser, Writer } from 'n3';
import { readFile, writeFile } from 'fs/promises';
import { config } from '../config';
import { store } from './queries';

const assetsPath = join(config.assetsPath, 'kb');
const kbFilePath = resolve(assetsPath, 'kb.n3');

export const initKB = async () => {
  const kb = await readFile(kbFilePath, { encoding: 'utf8' });
  store.addQuads(new Parser({ format: 'text/n3' }).parse(kb));
};

export const saveKB = async () => {
  const kb = new Writer({ format: 'text/n3' }).quadsToString(
    store.getQuads(null, null, null, null)
  );
  await writeFile(kbFilePath, kb, { encoding: 'utf8' });
};
