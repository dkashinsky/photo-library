import { ipcMain, dialog, BrowserWindow } from 'electron';
import { addDirectory, getDirectories, processDirectory } from './handlers/folders';
import { getFile, getFiles, linkFaceAreaToPerson, processFile, recognizeFaceArea, unlinkFaceAreaFromPerson } from './handlers/files';
import { addPerson, getPeople } from './handlers/people';

export type LinkPersonRequest = {
  faceAreaId: string;
  personId: string;
  asReference?: boolean;
}

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

  ipcMain.handle('api:getFiles', async (_, directoryId: string) => {
    return await getFiles(directoryId);
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
    const { faceAreaId, personId, asReference } = linkRequest;

    return await linkFaceAreaToPerson(faceAreaId, personId, asReference);
  });

  ipcMain.handle('api:unlinkPerson', async (_, faceAreaId: string) => {
    return await unlinkFaceAreaFromPerson(faceAreaId);
  });

  ipcMain.handle('api:recognizePerson', async (_, faceAreaId: string) => {
    return await recognizeFaceArea(faceAreaId);
  });
};
