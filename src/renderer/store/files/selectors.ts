import { RootState } from "../store";

export const selectFiles = (state: RootState) => state.files.files;
export const selectFilesLoading = (state: RootState) => state.files.isLoading;
