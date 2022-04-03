const { BrowserWindow } = require('electron');
const { resolve } = require('path');

const createMainWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: resolve(__dirname, '../preload/index.js'),
    },
  });

  //mainWindow.loadFile(resolve(__dirname, './ui/index.html'));
  return await mainWindow.loadURL('http://localhost:3000');
};

module.exports = {
  createMainWindow,
};
