import { call, put } from "redux-saga/effects";
import { DirectoryInfo } from "../../../preload/preload";
import api from "../../bridge/api";
import { receiveLocationItems } from "./actions";

function* requestCurrentLocations() {
  const directories: DirectoryInfo[] = yield call(api.getDirectories);
  yield put(receiveLocationItems(directories));
}

export default [
  requestCurrentLocations,
];
