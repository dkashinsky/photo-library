import { call, put, takeEvery } from "redux-saga/effects";
import { DirectoryInfoDTO } from "../../../preload/preload";
import api from "../../bridge/api";
import {
  LocationsActionType,
  receiveLocationItems,
  addLocationItemComplete,
  processLocationItemInit,
  processLocationItemComplete,
} from "./actions";

function* requestCurrentLocations() {
  const directories: DirectoryInfoDTO[] = yield call(api.getDirectories);
  yield put(receiveLocationItems(directories));
}

function* watchAddLocationItemInit() {
  yield takeEvery(
    LocationsActionType.AddItemInit,
    function* () {
      const directory: DirectoryInfoDTO | null = yield call(api.addDirectory);
      if (directory) {
        yield put(addLocationItemComplete(directory));
      }
    }
  );
}

function* watchAddLocationItemComplete() {
  yield takeEvery(
    LocationsActionType.AddItemComplete,
    function* ({ payload }: ReturnType<typeof addLocationItemComplete>) {
      const { id, isProcessed } = payload;
      if (!isProcessed) {
        yield put(processLocationItemInit(id));
        const directory: DirectoryInfoDTO = yield call(api.processDirectory, id);
        yield put(processLocationItemComplete(directory));
      }
    }
  );
}

export default [
  requestCurrentLocations,
  watchAddLocationItemInit,
  watchAddLocationItemComplete,
];
