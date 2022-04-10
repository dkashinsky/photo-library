const { ipcMain, dialog } = require('electron');
const { basename } = require('path');
const { Folder } = require('./data-layer');

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
};

const getDirectoryInfo = (folder) => ({
  id: folder.id,
  name: basename(folder.path),
  path: folder.path,
});

module.exports = {
  registerEventHandlers,
};
