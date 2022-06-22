import path from 'path';
import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './main-window';
import { registerEventHandlers } from './event-handlers';
import { initDB } from './db';
import { initFaceAPI } from './face-api';
import { config } from './config';
import { initKB } from './kb';

let mainWindow = null;

app.whenReady()
  .then(initDB)
  .then(initKB)
  .then(initFaceAPI)
  .then(() => {
    mainWindow = createMainWindow();

    const rendererLoading = config.useLocalhost
      ? mainWindow.loadURL('http://localhost:3000')
      : mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

    registerEventHandlers(mainWindow);

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createMainWindow();
      }
    });

    return rendererLoading;
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
