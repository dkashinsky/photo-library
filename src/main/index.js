const { app } = require('electron');
const { createMainWindow } = require('./main-window');
const { registerEventHandlers } = require('./event-handlers');

let mainWindow = null;

app.whenReady().then(() => {
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
