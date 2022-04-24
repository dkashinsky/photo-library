import { combineReducers } from "redux";
import { FileInfo } from "../../../preload/preload";
import { FilesAction, FilesActionType } from "./actions";

type FilesState = {
  files: FileInfo[];
  isLoading: boolean;
  selectedId: string | null;
}

const INITIAL_STATE: FilesState = {
  files: [],
  isLoading: false,
  selectedId: null,
};

function filesReducer(
  state: FileInfo[] = INITIAL_STATE.files,
  action: FilesAction,
): FileInfo[] {
  switch (action.type) {
    case FilesActionType.ResetFiles:
      return INITIAL_STATE.files;
    case FilesActionType.GetFilesComplete:
      return [...action.payload];
    default:
      return state;
  }
}

function isLoadingReducer(
  state: boolean = INITIAL_STATE.isLoading,
  action: FilesAction,
): boolean {
  switch (action.type) {
    case FilesActionType.GetFilesInit:
      return true;
    case FilesActionType.GetFilesComplete:
      return false;
    default:
      return state;
  }
}

function selectedIdReducer(
  state: string | null = INITIAL_STATE.selectedId,
  action: FilesAction,
): string | null {
  switch (action.type) {
    case FilesActionType.SelectItem:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  files: filesReducer,
  isLoading: isLoadingReducer,
  selectedId: selectedIdReducer,
});
