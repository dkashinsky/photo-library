const { join, extname } = require('path');
const { readdir, lstat } = require('fs/promises');

async function* directoryFilesWalker(path, ext) {
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

module.exports = directoryFilesWalker;
