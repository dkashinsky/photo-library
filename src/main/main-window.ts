import { BrowserWindow } from 'electron';
import { resolve } from 'path';

export const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: resolve(__dirname, '../preload/index.js'),
      webSecurity: false, // TODO: this is only to display images. need to find a secure way
    },
  });

  return mainWindow;
};
