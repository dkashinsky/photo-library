export type DirectoryInfo = {
  id: string;
  name: string;
  path: string;
  isProcessed: boolean;
}

export type FileInfo = {
  id: number;
  folderId: string;
  name: string;
  path: string;
  size: number;
  createDate: Date;
}

export interface ElectronBridge {
  versions: {
    chrome: string;
    node: string;
    electron: string;
  }
  api: {
    addDirectory: () => Promise<DirectoryInfo | null>;
    processDirectory: (directoryId: string) => Promise<DirectoryInfo>,
    getDirectories: () => Promise<DirectoryInfo[]>;
    getFiles: (directoryId: string) => Promise<FileInfo[]>;
  }
}

declare global {
  interface Window {
    // can be undefined in non electron environment
    bridge?: ElectronBridge;
  }
}
