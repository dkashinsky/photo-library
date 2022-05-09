import { call, put, takeEvery } from "redux-saga/effects";
import { PersonDTO } from "../../../preload/preload";
import api from "../../bridge/api";
import { addPersonComplete, addPersonInit, getPeopleComplete, PeopleActionType } from "./actions";

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

export default [
  requestCurrentPeople,
  watchAddPersonInit,
];
