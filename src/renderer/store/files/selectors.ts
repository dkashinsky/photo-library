import { createSelector } from "reselect";
import { RootState } from "../store";
import { itemsById } from "../utils";

export const selectFiles = (state: RootState) => state.files.files;
export const selectFilesById = createSelector([selectFiles], itemsById);
export const selectFilesLoading = (state: RootState) => state.files.isLoading;
export const selectSelectedFileId = (state: RootState) => state.files.selectedId;
export const selectProcessingById = (state: RootState) => state.files.processingById;
export const selectExtendedFilesById = (state: RootState) => state.files.extendedFilesById;
export const selectStartDateFilter = (state: RootState) => state.files.startDate;
export const selectEndDateFilter = (state: RootState) => state.files.endDate;
