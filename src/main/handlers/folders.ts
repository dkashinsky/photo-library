import { basename } from 'path';
import { Folder, File } from '../db';
import directoryFilesWalker from './utils/directory-walker';
import { processFile } from './files';

const getDirectoryInfoDTO = (folder: Folder) => ({
  id: folder.id,
  name: basename(folder.path),
  path: folder.path,
  isProcessed: folder.isProcessed,
});

export const addDirectory = async (path: string) => {
  const folder = await Folder.create({ path });

  return getDirectoryInfoDTO(folder);
};

export const getDirectories = async () => {
  const folders = await Folder.findAll();

  return folders.map(getDirectoryInfoDTO);
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

  return getDirectoryInfoDTO(folder);
};

export const recognizeDirectory = async (directoryId: string) => {
  const files = await File.findAll({
    where: {
      folderId: directoryId,
      isProcessed: false,
    },
  });

  const counters = {
    total: files.length,
    successfull: 0,
  };

  for (let file of files) {
    try {
      await processFile(file.id);
      counters.successfull += 1;
    } catch { }
  }

  console.log(counters)

  return counters;
};
