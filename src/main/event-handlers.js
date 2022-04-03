const { ipcMain } = require('electron');
const { readdir } = require('fs/promises');

const registerEventHandlers = () => {
  ipcMain.handle('fs:current-folder', async () => {
    return await readdir(__dirname);
  });
};

module.exports = {
  registerEventHandlers,
};
