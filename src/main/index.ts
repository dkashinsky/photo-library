import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './main-window';
import { registerEventHandlers } from './event-handlers';
import { initDB } from './db';
import { initFaceAPI } from './face-api';

let mainWindow = null;

app.whenReady()
  .then(initDB)
  .then(initFaceAPI)
  .then(() => {
    mainWindow = createMainWindow();
    mainWindow.loadURL('http://localhost:3000');

    registerEventHandlers(mainWindow);

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow = createMainWindow();
      }
    });
  });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
