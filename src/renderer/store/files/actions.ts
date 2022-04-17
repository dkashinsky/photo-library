import { FileInfo } from "../../../preload/preload";
import { Action, PayloadAction } from "../utils";

export enum FilesActionType {
  ResetFiles = '[Files] Reset',
  GetFilesInit = '[Files] Get Files - Init',
  GetFilesComplete = '[Files] Get Files - Complete',
}

export const resetFiles: Action<typeof FilesActionType.ResetFiles> = () => ({
  type: FilesActionType.ResetFiles,
});

export const getFilesInit: PayloadAction<typeof FilesActionType.GetFilesInit, string> = (id) => ({
  type: FilesActionType.GetFilesInit,
  payload: id,
});

export const getFilesComplete: PayloadAction<typeof FilesActionType.GetFilesComplete, FileInfo[]> = (item) => ({
  type: FilesActionType.GetFilesComplete,
  payload: item,
});

export type FilesAction =
  | ReturnType<typeof resetFiles>
  | ReturnType<typeof getFilesInit>
  | ReturnType<typeof getFilesComplete>;
