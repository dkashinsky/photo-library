import { ipcMain, dialog, BrowserWindow } from 'electron';
import { addDirectory, getDirectories, processDirectory } from './handlers/folders';
import { getFiles } from './handlers/files';

export const registerEventHandlers = (mainWindow: BrowserWindow) => {
  ipcMain.handle('api:addDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });

    if (!canceled) {
      return await addDirectory(filePaths[0]);
    }

    return null;
  });

  ipcMain.handle('api:getDirectories', async () => {
    return await getDirectories();
  });

  ipcMain.handle('api:processDirectory', async (_, directoryId) => {
    return await processDirectory(directoryId);
  });

  ipcMain.handle('api:getFiles', async (_, directoryId) => {
    return await getFiles(directoryId);
  });
};
