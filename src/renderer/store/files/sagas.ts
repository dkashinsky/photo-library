import { call, put, takeEvery } from "redux-saga/effects";
import { FileInfo } from "../../../preload/preload";
import api from "../../bridge/api";
import {
  FilesActionType,
  getFilesInit,
  getFilesComplete,
} from "./actions";

function* watchGetFilesInit() {
  yield takeEvery(
    FilesActionType.GetFilesInit,
    function* ({ payload: directoryId }: ReturnType<typeof getFilesInit>) {
      const files: FileInfo[] = yield call(api.getFiles, directoryId);
      yield put(getFilesComplete(files));
    }
  );
}

export default [
  watchGetFilesInit,
];
