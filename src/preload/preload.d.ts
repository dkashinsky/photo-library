export type DirectoryInfoDTO = {
  id: string;
  name: string;
  path: string;
  isProcessed: boolean;
}

export type FileInfoDTO = {
  id: string;
  folderId: string;
  name: string;
  path: string;
  size: number;
  createDate: Date;
  isProcessed: boolean;
}

export type FaceAreaDTO = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  personId?: string;
}

export type FileInfoExtendedDTO = FileInfoDTO & {
  faceAreas: FaceAreaDTO[];
}

export type PersonDTO = {
  id: string;
  name: string;
}

export type LinkPersonRequest = {
  faceAreaId: string;
  personId: string;
  asReference?: boolean;
}

export type FilesRequest = {
  directoryId: string;
  startDate?: Date | null;
  endDate?: Date | null;
  peopleIds?: string[];
}

export interface ElectronBridge {
  versions: {
    chrome: string;
    node: string;
    electron: string;
  }
  api: {
    addDirectory: () => Promise<DirectoryInfoDTO | null>;
    processDirectory: (directoryId: string) => Promise<DirectoryInfoDTO>;
    recognizeDirectory: (directoryId: string) => Promise<void>;
    getDirectories: () => Promise<DirectoryInfoDTO[]>;
    getFiles: (filesRequest: FilesRequest) => Promise<FileInfoDTO[]>;
    getFile: (fileId: string) => Promise<FileInfoExtendedDTO>;
    processFile: (fileId: string) => Promise<FileInfoExtendedDTO>;
    getPeople: () => Promise<PersonDTO[]>;
    addPerson: (name: string) => Promise<PersonDTO>;
    linkPerson: (linkRequest: LinkPersonRequest) => Promise<FileInfoExtendedDTO>;
    unlinkPerson: (faceAreaId: string) => Promise<FileInfoExtendedDTO>;
    recognizePerson: (faceAreaId: string) => Promise<PersonDTO | null>;
  }
}

declare global {
  interface Window {
    // can be undefined in non electron environment
    bridge?: ElectronBridge;
  }
}
