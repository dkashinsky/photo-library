import { call, put, takeEvery } from "redux-saga/effects";
import { FileInfoExtendedDTO, PersonDTO } from "../../../preload/preload";
import api from "../../bridge/api";
import { addPersonComplete, addPersonInit, getPeopleComplete, linkPersonComplete, linkPersonInit, PeopleActionType, unlinkPersonComplete, unlinkPersonInit } from "./actions";

function* requestCurrentPeople() {
  const people: PersonDTO[] = yield call(api.getPeople);
  yield put(getPeopleComplete(people));
}

function* watchAddPersonInit() {
  yield takeEvery(
    PeopleActionType.AddPersonInit,
    function* ({ payload: name }: ReturnType<typeof addPersonInit>) {
      const person: PersonDTO = yield call(api.addPerson, name);
      yield put(addPersonComplete(person));
    }
  );
}

function* watchLinkPersonInit() {
  yield takeEvery(
    PeopleActionType.LinkPersonInit,
    function* (action: ReturnType<typeof linkPersonInit>) {
      const { faceAreaId, personId } = action.payload;
      const updatedFileInfo: FileInfoExtendedDTO = yield call(api.linkPerson, faceAreaId, personId);
      yield put(linkPersonComplete(updatedFileInfo));
    }
  );
}

function* watchUnlinkPersonInit() {
  yield takeEvery(
    PeopleActionType.UnlinkPersonInit,
    function* ({ payload: faceAreaId }: ReturnType<typeof unlinkPersonInit>) {
      const updatedFileInfo: FileInfoExtendedDTO = yield call(api.unlinkPerson, faceAreaId);
      yield put(unlinkPersonComplete(updatedFileInfo));
    }
  );
}

export default [
  requestCurrentPeople,
  watchAddPersonInit,
  watchLinkPersonInit,
  watchUnlinkPersonInit,
];
