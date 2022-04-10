const { ipcMain, dialog } = require('electron');
const { basename } = require('path');

const registerEventHandlers = (mainWindow) => {
  ipcMain.handle('api:addDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    return canceled
      ? null
      : getDirectoryInfo(filePaths[0]);
  });
};

const getDirectoryInfo = (path) => {
  return {
    name: basename(path),
    path,
  };
};

module.exports = {
  registerEventHandlers,
};
