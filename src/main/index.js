const { app } = require('electron');
const { createMainWindow } = require('./main-window');
const { registerEventHandlers } = require('./event-handlers');

app.whenReady().then(() => {
  registerEventHandlers();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
