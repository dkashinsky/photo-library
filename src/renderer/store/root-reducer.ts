import { combineReducers } from "redux";
import treeViewReducer from './tree-view/reducer';

export const rootReducer = combineReducers({
  treeView: treeViewReducer,
});
