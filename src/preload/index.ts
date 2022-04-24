import { contextBridge, ipcRenderer } from 'electron';

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
  getDirectories: () => ipcRenderer.invoke('api:getDirectories'),
  getFiles: (directoryId: string) => ipcRenderer.invoke('api:getFiles', directoryId),
  getFile: (fileId: string) => ipcRenderer.invoke('api:getFile', fileId),
  processFile: (fileId: string) => ipcRenderer.invoke('api:processFile', fileId),
};

const bridge = {
  versions: getVersions(),
  api,
};

contextBridge.exposeInMainWorld('bridge', bridge);
