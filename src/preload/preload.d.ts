export interface ElectronBridge {
  versions: {
    chrome: string;
    node: string;
    electron: string;
  },
  fs: {
    readCurrentFolder: () => Promise<string[]>;
  }
}

declare global {
  interface Window {
    // can be undefined in non electron environment
    bridge?: ElectronBridge;
  }
}
