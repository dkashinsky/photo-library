import { call, put, takeEvery } from "redux-saga/effects";
import { DirectoryInfo } from "../../../preload/preload";
import api from "../../bridge/api";
import {
  LocationsActionType,
  receiveLocationItems,
  addLocationItemComplete,
} from "./actions";

function* requestCurrentLocations() {
  const directories: DirectoryInfo[] = yield call(api.getDirectories);
  yield put(receiveLocationItems(directories));
}

function* watchAddLocationItemInit() {
  yield takeEvery(
    LocationsActionType.AddItemInit,
    function* () {
      const directory: DirectoryInfo | null = yield call(api.addDirectory);
      if (directory) {
        yield put(addLocationItemComplete(directory));
      }
    }
  );
}

export default [
  requestCurrentLocations,
  watchAddLocationItemInit,
];
