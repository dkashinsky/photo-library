import { contextBridge, ipcRenderer } from 'electron';
import { FilesRequest, LinkPersonRequest } from './preload';

const getVersions = () => {
  const versions: Record<string, string | undefined> = {};

  for (const type of ['chrome', 'node', 'electron']) {
    versions[type] = process.versions[type];
  }

  return versions;
};

const api = {
  addDirectory: () => ipcRenderer.invoke('api:addDirectory'),
  processDirectory: (directoryId: string) => ipcRenderer.invoke('api:processDirectory', directoryId),
  recognizeDirectory: (directoryId: string) => ipcRenderer.invoke('api:recognizeDirectory', directoryId),
  getDirectories: () => ipcRenderer.invoke('api:getDirectories'),
  getFiles: (filesRequest: FilesRequest) => ipcRenderer.invoke('api:getFiles', filesRequest),
  getFile: (fileId: string) => ipcRenderer.invoke('api:getFile', fileId),
  processFile: (fileId: string) => ipcRenderer.invoke('api:processFile', fileId),
  getPeople: () => ipcRenderer.invoke('api:getPeople'),
  addPerson: (name: string) => ipcRenderer.invoke('api:addPerson', name),
  linkPerson: (linkRequest: LinkPersonRequest) => ipcRenderer.invoke('api:linkPerson', linkRequest),
  unlinkPerson: (faceAreaId: string) => ipcRenderer.invoke('api:unlinkPerson', faceAreaId),
  recognizePerson: (faceAreaId: string) => ipcRenderer.invoke('api:recognizePerson', faceAreaId),
};

const bridge = {
  versions: getVersions(),
  api,
};

contextBridge.exposeInMainWorld('bridge', bridge);
