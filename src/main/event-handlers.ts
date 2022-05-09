import { ipcMain, dialog, BrowserWindow } from 'electron';
import { addDirectory, getDirectories, processDirectory } from './handlers/folders';
import { getFile, getFiles, processFile } from './handlers/files';
import { addPerson, getPeople } from './handlers/people';

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

  ipcMain.handle('api:getFile', async (_, fileId) => {
    return await getFile(fileId);
  });

  ipcMain.handle('api:processFile', async (_, fileId) => {
    return await processFile(fileId);
  });

  ipcMain.handle('api:getPeople', async () => {
    return await getPeople();
  });

  ipcMain.handle('api:addPerson', async (_, name) => {
    return await addPerson(name);
  });
};
