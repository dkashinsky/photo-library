import { all, spawn } from 'redux-saga/effects';
import locationSagas from './locations/sagas';
import filesSagas from './files/sagas';

export const rootSaga = function* () {
  const sagas = [
    ...locationSagas,
    ...filesSagas
  ];

  yield all(sagas.map(saga => spawn(saga)));
}
