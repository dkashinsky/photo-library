import { FileInfo } from "../../../preload/preload";
import { Action, PayloadAction } from "../utils";

export enum FilesActionType {
  ResetFiles = '[Files] Reset',
  GetFilesInit = '[Files] Get Files - Init',
  GetFilesComplete = '[Files] Get Files - Complete',
  SelectItem = '[Files] Select Item',
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

export const selectFileId: PayloadAction<typeof FilesActionType.SelectItem, FileInfo['id'] | null> = (id) => ({
  type: FilesActionType.SelectItem,
  payload: id,
});

export type FilesAction =
  | ReturnType<typeof selectFileId>
  | ReturnType<typeof resetFiles>
  | ReturnType<typeof getFilesInit>
  | ReturnType<typeof getFilesComplete>;
