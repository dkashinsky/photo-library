const { ipcMain, dialog } = require('electron');
const { basename, join } = require('path');
const { readdir, lstat } = require('fs/promises');
const { Folder, File } = require('./data-layer');
const directoryFilesWalker = require('./handlers/utils/directory-walker');

const registerEventHandlers = (mainWindow) => {
  ipcMain.handle('api:addDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    if (!canceled) {
      const folder = await Folder.create({ path: filePaths[0] });
      return getDirectoryInfo(folder);
    }

    return null;
  });

  ipcMain.handle('api:getDirectories', async () => {
    const folders = await Folder.findAll();

    return folders.map(getDirectoryInfo);
  });

  ipcMain.handle('api:processDirectory', async (_, directoryId) => {
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
  });
};

const getDirectoryInfo = (folder) => ({
  id: folder.id,
  name: basename(folder.path),
  path: folder.path,
  isProcessed: folder.isProcessed,
});

module.exports = {
  registerEventHandlers,
};
