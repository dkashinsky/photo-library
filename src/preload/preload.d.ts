export type DirectoryInfo = {
  name: string;
  path: string;
}

export interface ElectronBridge {
  versions: {
    chrome: string;
    node: string;
    electron: string;
  }
  api: {
    addDirectory: () => Promise<DirectoryInfo | null>;
  }
}

declare global {
  interface Window {
    // can be undefined in non electron environment
    bridge?: ElectronBridge;
  }
}
