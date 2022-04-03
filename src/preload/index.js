const { contextBridge, ipcRenderer } = require('electron');

const getVersions = () => {
  const versions = {};

  for (const type of ['chrome', 'node', 'electron']) {
    versions[type] = process.versions[type];
  }

  return versions;
};

const fs = {
  readCurrentFolder : () => ipcRenderer.invoke('fs:current-folder'),
};

const bridge = {
  versions: getVersions(),
  fs,
};

contextBridge.exposeInMainWorld('bridge', bridge);
