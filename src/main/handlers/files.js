const { File } = require('../data-layer');

const getFileInfo = (file) => ({
  id: file.id,
  folderId: file.folderId,
  name: file.name,
  path: file.path,
  size: file.size,
  createDate: file.createDate.toISOString(),
});

const getFiles = async (folderId) => {
  const files = await File.findAll({
    where: { folderId },
    order: [['createDate', 'DESC']],
  });

  return files.map(getFileInfo);
};

module.exports = {
  getFiles,
};
