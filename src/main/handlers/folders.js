const { basename } = require('path');
const { Folder, File } = require('../data-layer');
const directoryFilesWalker = require('./utils/directory-walker');

const getDirectoryInfo = (folder) => ({
  id: folder.id,
  name: basename(folder.path),
  path: folder.path,
  isProcessed: folder.isProcessed,
});

const addDirectory = async (path) => {
  const folder = await Folder.create({ path });

  return getDirectoryInfo(folder);
};

const getDirectories = async () => {
  const folders = await Folder.findAll();

  return folders.map(getDirectoryInfo);
};

const processDirectory = async (directoryId) => {
  const folder = await Folder.findByPk(directoryId);
  const extMatcher = /\.jpg$/i;

  for await (let file of directoryFilesWalker(folder.path, extMatcher)) {
    const { filePath, fileInfo } = file;
    await File.create({
      folderId: folder.id,
      path: filePath,
      name: basename(filePath),
      size: fileInfo.size,
      createDate: fileInfo.mtime,
    });
  }

  folder.isProcessed = true;
  await folder.save();

  return getDirectoryInfo(folder);
};

module.exports = {
  addDirectory,
  getDirectories,
  processDirectory,
};
