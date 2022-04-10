import { combineReducers } from "redux";
import locationsReducer from './locations/reducer';

export const rootReducer = combineReducers({
  location: locationsReducer,
});
