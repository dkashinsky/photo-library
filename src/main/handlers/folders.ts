import { basename } from 'path';
import { Folder, File } from '../db';
import directoryFilesWalker from './utils/directory-walker';

const getDirectoryInfo = (folder: Folder) => ({
  id: folder.id,
  name: basename(folder.path),
  path: folder.path,
  isProcessed: folder.isProcessed,
});

export const addDirectory = async (path: string) => {
  const folder = await Folder.create({ path });

  return getDirectoryInfo(folder);
};

export const getDirectories = async () => {
  const folders = await Folder.findAll();

  return folders.map(getDirectoryInfo);
};

export const processDirectory = async (directoryId: string) => {
  const folder = await Folder.findByPk(directoryId);
  const extMatcher = /\.jpg$/i;

  if (!folder) {
    throw new Error('No Directory Found...');
  }

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
