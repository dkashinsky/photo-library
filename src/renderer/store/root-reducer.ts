import { combineReducers } from "redux";
import locationsReducer from './locations/reducer';
import filesReducer from './files/reducer';

export const rootReducer = combineReducers({
  location: locationsReducer,
  files: filesReducer,
});
