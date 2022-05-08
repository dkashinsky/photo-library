import { combineReducers } from "redux";
import locationsReducer from './locations/reducer';
import filesReducer from './files/reducer';
import peopleReducer from './people/reducer';

export const rootReducer = combineReducers({
  location: locationsReducer,
  files: filesReducer,
  people: peopleReducer,
});
