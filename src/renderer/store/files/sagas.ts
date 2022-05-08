import { call, put, select, takeEvery } from "redux-saga/effects";
import { FileInfoDTO, FileInfoExtendedDTO } from "../../../preload/preload";
import api from "../../bridge/api";
import { ItemsById } from "../utils";
import {
  FilesActionType,
  getFilesInit,
  getFilesComplete,
  processFileInit,
  processFileComplete,
  selectFileId,
  getExtendedFileComplete,
} from "./actions";
import { selectExtendedFilesById } from "./selectors";

function* watchGetFilesInit() {
  yield takeEvery(
    FilesActionType.GetFilesInit,
    function* ({ payload: directoryId }: ReturnType<typeof getFilesInit>) {
      const files: FileInfoDTO[] = yield call(api.getFiles, directoryId);
      yield put(getFilesComplete(files));
    }
  );
}

function* watchSelectItem() {
  yield takeEvery(
    FilesActionType.SelectItem,
    function* ({ payload: fileId }: ReturnType<typeof selectFileId>) {
      const files: ItemsById<FileInfoExtendedDTO> = yield select(selectExtendedFilesById)

      if (fileId && !files[fileId]) {
        const file: FileInfoExtendedDTO = yield call(api.getFile, fileId);
        yield put(getExtendedFileComplete(file));
      }
    }
  );
}

function* watchProcessFileInit() {
  yield takeEvery(
    FilesActionType.ProcessFileInit,
    function* ({ payload: fileId }: ReturnType<typeof processFileInit>) {
      const file: FileInfoExtendedDTO = yield call(api.processFile, fileId);
      yield put(processFileComplete(file));
    }
  );
}

export default [
  watchGetFilesInit,
  watchSelectItem,
  watchProcessFileInit,
];
