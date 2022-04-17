import { combineReducers } from "redux";
import { FileInfo } from "../../../preload/preload";
import { FilesAction, FilesActionType } from "./actions";

type FilesState = {
  files: FileInfo[];
  isLoading: boolean;
}

const INITIAL_STATE: FilesState = {
  files: [],
  isLoading: false,
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

export default combineReducers({
  files: filesReducer,
  isLoading: isLoadingReducer,
});
