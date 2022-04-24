import { File } from '../db';

const getFileInfo = (file: File) => ({
  id: file.id,
  folderId: file.folderId,
  name: file.name,
  path: file.path,
  size: file.size,
  createDate: file.createDate,
  isProcessed: file.isProcessed,
});

export const getFiles = async (folderId: string) => {
  const files = await File.findAll({
    where: { folderId },
    order: [['createDate', 'DESC']],
  });

  return files.map(getFileInfo);
};

export const getFile = async (fileId: string) => {
  const file = await File.findByPk(fileId);

  if (!file) {
    throw new Error('No File Found...');
  }

  return getFileInfo(file);
};


export const processFile = async (fileId: string) => {
  const file = await File.findByPk(fileId);

  if (!file) {
    throw new Error('No File Found...');
  }

  if (!file.isProcessed) {
    console.log('processing...');
    file.isProcessed = true;
    await file.save();
  }

  return getFileInfo(file);
};
