import { FileInfoDTO, FileInfoExtendedDTO, FilesRequest } from "../../../preload/preload";
import { Action, PayloadAction } from "../utils";

export enum FilesActionType {
  ResetFiles = '[Files] Reset',
  GetFilesInit = '[Files] Get Files - Init',
  GetFilesComplete = '[Files] Get Files - Complete',
  SelectItem = '[Files] Select Item',
  GetExtendedFileInit = '[Files] Get Extended File - Init',
  GetExtendedFileComplete = '[Files] Get Extended File - Complete',
  ProcessFileInit = '[Files] Process File - Init',
  ProcessFileComplete = '[Files] Process File - Complete',
  SetStartDateFilter = '[Files] Set Start Date Filter',
  SetEndDateFilter = '[Files] Set End Date Filter',
}

export const resetFiles: Action<typeof FilesActionType.ResetFiles> = () => ({
  type: FilesActionType.ResetFiles,
});

export const getFilesInit: PayloadAction<typeof FilesActionType.GetFilesInit, FilesRequest> = (request) => ({
  type: FilesActionType.GetFilesInit,
  payload: request,
});

export const getFilesComplete: PayloadAction<typeof FilesActionType.GetFilesComplete, FileInfoDTO[]> = (item) => ({
  type: FilesActionType.GetFilesComplete,
  payload: item,
});

export const selectFileId: PayloadAction<typeof FilesActionType.SelectItem, FileInfoDTO['id'] | null> = (id) => ({
  type: FilesActionType.SelectItem,
  payload: id,
});

export const getExtendedFileInit: PayloadAction<typeof FilesActionType.GetExtendedFileInit, string> = (id) => ({
  type: FilesActionType.GetExtendedFileInit,
  payload: id,
});

export const getExtendedFileComplete: PayloadAction<typeof FilesActionType.GetExtendedFileComplete, FileInfoExtendedDTO> = (item) => ({
  type: FilesActionType.GetExtendedFileComplete,
  payload: item,
});

export const processFileInit: PayloadAction<typeof FilesActionType.ProcessFileInit, string> = (id) => ({
  type: FilesActionType.ProcessFileInit,
  payload: id,
});

export const processFileComplete: PayloadAction<typeof FilesActionType.ProcessFileComplete, FileInfoExtendedDTO> = (item) => ({
  type: FilesActionType.ProcessFileComplete,
  payload: item,
});

export const setStartDateFilter: PayloadAction<typeof FilesActionType.SetStartDateFilter, Date | null> = (startDate) => ({
  type: FilesActionType.SetStartDateFilter,
  payload: startDate,
});

export const setEndDateFilter: PayloadAction<typeof FilesActionType.SetEndDateFilter, Date | null> = (endDate) => ({
  type: FilesActionType.SetEndDateFilter,
  payload: endDate,
});

export type FilesAction =
  | ReturnType<typeof selectFileId>
  | ReturnType<typeof resetFiles>
  | ReturnType<typeof getFilesInit>
  | ReturnType<typeof getFilesComplete>
  | ReturnType<typeof getExtendedFileInit>
  | ReturnType<typeof getExtendedFileComplete>
  | ReturnType<typeof processFileInit>
  | ReturnType<typeof processFileComplete>
  | ReturnType<typeof setStartDateFilter>
  | ReturnType<typeof setEndDateFilter>;
