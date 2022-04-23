import { join, extname } from 'path';
import { readdir, lstat } from 'fs/promises';
import type { Stats } from 'original-fs';

export type FileInfo = {
  filePath: string;
  fileInfo: Stats;
}

async function* directoryFilesWalker(path: string, ext: RegExp): AsyncGenerator<FileInfo, void, void> {
  const dirItems = await readdir(path);

  for (let item of dirItems) {
    const itemPath = join(path, item);
    const itemInfo = await lstat(itemPath);

    if (itemInfo.isFile() && ext.test(extname(item))) {
      yield {
        filePath: itemPath,
        fileInfo: itemInfo,
      };
    } else if (itemInfo.isDirectory()) {
      yield* directoryFilesWalker(itemPath, ext);
    }
  }
}

export default directoryFilesWalker;
