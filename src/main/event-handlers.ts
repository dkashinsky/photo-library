import { ipcMain, dialog, BrowserWindow } from 'electron';
import { addDirectory, getDirectories, processDirectory, recognizeDirectory } from './handlers/folders';
import { FilesRequest, getFile, getFiles, linkFaceAreaToPerson, LinkPersonRequest, processFile, recognizeFaceArea, unlinkFaceAreaFromPerson } from './handlers/files';
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

  ipcMain.handle('api:processDirectory', async (_, directoryId: string) => {
    return await processDirectory(directoryId);
  });

  ipcMain.handle('api:recognizeDirectory', async (_, directoryId: string) => {
    return await recognizeDirectory(directoryId);
  });

  ipcMain.handle('api:getFiles', async (_, filesRequest: FilesRequest) => {
    return await getFiles(filesRequest);
  });

  ipcMain.handle('api:getFile', async (_, fileId: string) => {
    return await getFile(fileId);
  });

  ipcMain.handle('api:processFile', async (_, fileId: string) => {
    return await processFile(fileId);
  });

  ipcMain.handle('api:getPeople', async () => {
    return await getPeople();
  });

  ipcMain.handle('api:addPerson', async (_, name: string) => {
    return await addPerson(name);
  });

  ipcMain.handle('api:linkPerson', async (_, linkRequest: LinkPersonRequest) => {
    return await linkFaceAreaToPerson(linkRequest);
  });

  ipcMain.handle('api:unlinkPerson', async (_, faceAreaId: string) => {
    return await unlinkFaceAreaFromPerson(faceAreaId);
  });

  ipcMain.handle('api:recognizePerson', async (_, faceAreaId: string) => {
    return await recognizeFaceArea(faceAreaId);
  });
};
