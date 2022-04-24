import { combineReducers } from "redux";
import { DirectoryInfoDTO } from "../../../preload/preload";
import { ItemsById } from "../utils";
import { LocationsAction, LocationsActionType } from "./actions";

type LocationsState = {
  locations: DirectoryInfoDTO[];
  selectedId: string | null;
  processById: ItemsById<boolean>;
}

const INITIAL_STATE: LocationsState = {
  locations: [],
  selectedId: null,
  processById: {},
};

function locationsReducer(
  state: DirectoryInfoDTO[] = INITIAL_STATE.locations,
  action: LocationsAction,
): DirectoryInfoDTO[] {
  switch (action.type) {
    case LocationsActionType.AddItemComplete:
      return [...state, action.payload];
    case LocationsActionType.ReceiveItems:
      return [...action.payload];
    case LocationsActionType.ProcessItemComplete:
      const itemIndex = state.findIndex(({ id }) => id === action.payload.id);
      const newState = [...state];
      newState[itemIndex] = action.payload;
      return newState;
    default:
      return state;
  }
}

function selectedIdReducer(
  state: string | null = INITIAL_STATE.selectedId,
  action: LocationsAction,
): string | null {
  switch (action.type) {
    case LocationsActionType.SelectItem:
      return action.payload;
    default:
      return state;
  }
}

function processByIdReducer(
  state: ItemsById<boolean> = INITIAL_STATE.processById,
  action: LocationsAction,
): ItemsById<boolean> {
  switch (action.type) {
    case LocationsActionType.ProcessItemInit:
      return { ...state, [action.payload]: true };
    case LocationsActionType.ProcessItemComplete:
      return { ...state, [action.payload.id]: false };
    default:
      return state;
  }
}

export default combineReducers({
  locations: locationsReducer,
  selectedId: selectedIdReducer,
  processById: processByIdReducer,
});
