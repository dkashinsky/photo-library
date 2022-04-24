export type DirectoryInfo = {
  id: string;
  name: string;
  path: string;
  isProcessed: boolean;
}

export type FileInfo = {
  id: string;
  folderId: string;
  name: string;
  path: string;
  size: number;
  createDate: Date;
  isProcessed: boolean;
}

export type FaceArea = {
  id: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export type FileInfoExtended = FileInfo & {
  faceAreas: FaceArea[];
}

export interface ElectronBridge {
  versions: {
    chrome: string;
    node: string;
    electron: string;
  }
  api: {
    addDirectory: () => Promise<DirectoryInfo | null>;
    processDirectory: (directoryId: string) => Promise<DirectoryInfo>;
    getDirectories: () => Promise<DirectoryInfo[]>;
    getFiles: (directoryId: string) => Promise<FileInfo[]>;
    getFile: (fileId: string) => Promise<FileInfoExtended>;
    processFile: (fileId: string) => Promise<FileInfoExtended>;
  }
}

declare global {
  interface Window {
    // can be undefined in non electron environment
    bridge?: ElectronBridge;
  }
}
