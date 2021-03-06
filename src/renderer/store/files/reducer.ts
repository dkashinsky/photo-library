import { combineReducers } from "redux";
import { FileInfoDTO, FileInfoExtendedDTO } from "../../../preload/preload";
import { PeopleAction, PeopleActionType } from "../people/actions";
import { ItemsById } from "../utils";
import { FilesAction, FilesActionType } from "./actions";

type FilesState = {
  files: FileInfoDTO[];
  isLoading: boolean;
  selectedId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  peopleIds: string[];
  processingById: ItemsById<boolean>;
  extendedFilesById: ItemsById<FileInfoExtendedDTO>;
}

const INITIAL_STATE: FilesState = {
  files: [],
  isLoading: false,
  selectedId: null,
  startDate: null,
  endDate: null,
  peopleIds: [],
  processingById: {},
  extendedFilesById: {},
};

function filesReducer(
  state: FileInfoDTO[] = INITIAL_STATE.files,
  action: FilesAction,
): FileInfoDTO[] {
  switch (action.type) {
    case FilesActionType.ResetFiles:
      return INITIAL_STATE.files;
    case FilesActionType.GetFilesComplete:
      return [...action.payload];
    case FilesActionType.ProcessFileComplete:
      const { id, isProcessed } = action.payload;
      const idx = state.findIndex(file => file.id === id);
      if (idx >= 0) {
        const newState = [...state];
        newState[idx] = { ...state[idx], isProcessed };
        return newState;
      }

      return state;
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

function processingByIdReducer(
  state: ItemsById<boolean> = INITIAL_STATE.processingById,
  action: FilesAction,
): ItemsById<boolean> {
  switch (action.type) {
    case FilesActionType.ProcessFileInit:
      return { ...state, [action.payload]: true };
    case FilesActionType.ProcessFileComplete:
      return { ...state, [action.payload.id]: false };
    default:
      return state;
  }
}

function extendedFilesByIdReducer(
  state: ItemsById<FileInfoExtendedDTO> = INITIAL_STATE.extendedFilesById,
  action: FilesAction | PeopleAction,
): ItemsById<FileInfoExtendedDTO> {
  switch (action.type) {
    case FilesActionType.GetExtendedFileComplete:
      return { ...state, [action.payload.id]: action.payload };
    case FilesActionType.ProcessFileComplete:
      return { ...state, [action.payload.id]: action.payload };
    case PeopleActionType.LinkPersonComplete:
      return { ...state, [action.payload.id]: action.payload };
    case PeopleActionType.UnlinkPersonComplete:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}

function startDateReducer(
  state: FilesState['startDate'] = INITIAL_STATE.startDate,
  action: FilesAction,
): FilesState['startDate'] {
  switch (action.type) {
    case FilesActionType.SetStartDateFilter:
      return action.payload;
    default:
      return state;
  }
}

function endDateReducer(
  state: FilesState['startDate'] = INITIAL_STATE.endDate,
  action: FilesAction,
): FilesState['startDate'] {
  switch (action.type) {
    case FilesActionType.SetEndDateFilter:
      return action.payload;
    default:
      return state;
  }
}

function peopleIdsReducer(
  state: FilesState['peopleIds'] = INITIAL_STATE.peopleIds,
  action: FilesAction,
): FilesState['peopleIds'] {
  switch (action.type) {
    case FilesActionType.SetPeopleFilter:
      return [...action.payload];
    default:
      return state;
  }
}

export default combineReducers({
  files: filesReducer,
  isLoading: isLoadingReducer,
  selectedId: selectedIdReducer,
  processingById: processingByIdReducer,
  extendedFilesById: extendedFilesByIdReducer,
  startDate: startDateReducer,
  endDate: endDateReducer,
  peopleIds: peopleIdsReducer,
});
