import { DirectoryInfo } from "../../../preload/preload";
import { LocationsAction, LocationsActionType } from "./actions";

type LocationsState = {
  locations: DirectoryInfo[];
  selectedId?: string;
}

const INITIAL_STATE: LocationsState = {
  locations: [],
};

export default function (
  state: LocationsState = INITIAL_STATE,
  action: LocationsAction,
): LocationsState {
  switch (action.type) {
    case LocationsActionType.AddItem:
      return { ...state, locations: [...state.locations, action.payload] };
    case LocationsActionType.SelectItem:
      return { ...state, selectedId: action.payload };
    case LocationsActionType.ReceiveItems:
      return { ...state, locations: action.payload };
    default:
      return state;
  }
}
