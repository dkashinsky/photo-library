import { call, put } from "redux-saga/effects";
import { PersonDTO } from "../../../preload/preload";
import api from "../../bridge/api";
import { getPeopleComplete } from "./actions";

function* requestCurrentPeople() {
  const people: PersonDTO[] = yield call(api.getPeople);
  yield put(getPeopleComplete(people));
}

export default [
  requestCurrentPeople,
];
