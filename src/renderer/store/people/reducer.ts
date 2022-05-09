import { combineReducers } from "redux";
import { PersonDTO } from "../../../preload/preload";
import { PeopleAction, PeopleActionType } from "./actions";

type PeopleState = {
  people: PersonDTO[];
  loading: boolean;
}

const INITIAL_STATE: PeopleState = {
  people: [],
  loading: false,
};

function peopleReducer(
  state: PersonDTO[] = INITIAL_STATE.people,
  action: PeopleAction,
): PersonDTO[] {
  switch (action.type) {
    case PeopleActionType.GetPeopleComplete:
      return [...action.payload];
    case PeopleActionType.AddPersonComplete:
      return [...state, action.payload];
    default:
      return state;
  }
}

function loadingReducer(
  state: boolean = INITIAL_STATE.loading,
  action: PeopleAction,
): boolean {
  switch (action.type) {
    case PeopleActionType.GetPeopleInit:
      return true;
    case PeopleActionType.GetPeopleComplete:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  people: peopleReducer,
  loading: loadingReducer,
});
