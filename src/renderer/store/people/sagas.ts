import { call, put, takeEvery } from "redux-saga/effects";
import { FileInfoExtendedDTO, PersonDTO } from "../../../preload/preload";
import api from "../../bridge/api";
import { addPersonComplete, addPersonInit, getPeopleComplete, linkPersonComplete, linkPersonInit, PeopleActionType, recognizePersonComplete, recognizePersonInit, unlinkPersonComplete, unlinkPersonInit } from "./actions";

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
    function* ({ payload: linkRequest }: ReturnType<typeof linkPersonInit>) {
      const updatedFileInfo: FileInfoExtendedDTO = yield call(api.linkPerson, linkRequest);
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

function* watchRecognizePersonInit() {
  yield takeEvery(
    PeopleActionType.RecognizePersonInit,
    function* ({ payload: faceAreaId }: ReturnType<typeof recognizePersonInit>) {
      const person: PersonDTO | null = yield call(api.recognizePerson, faceAreaId);
      yield put(recognizePersonComplete(person));
      if (person) {
        yield put(linkPersonInit({ faceAreaId, personId: person.id }))
      }
    }
  );
}

export default [
  requestCurrentPeople,
  watchAddPersonInit,
  watchLinkPersonInit,
  watchUnlinkPersonInit,
  watchRecognizePersonInit,
];
