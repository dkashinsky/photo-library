const { ipcMain } = require('electron');
const { readFile } = require('fs/promises');
const { resolve } = require('path');

const registerEventHandlers = () => {
  ipcMain.handle('api:kb:read', async () => {
    const kbFile = resolve(__dirname, '../../assets/KBTA.n3');
    return await readFile(kbFile, 'utf-8');
  });
};

module.exports = {
  registerEventHandlers,
};
