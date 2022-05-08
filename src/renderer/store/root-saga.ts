import { all, spawn } from 'redux-saga/effects';
import locationSagas from './locations/sagas';
import filesSagas from './files/sagas';
import peopleSagas from './people/sagas';

export const rootSaga = function* () {
  const sagas = [
    ...locationSagas,
    ...filesSagas,
    ...peopleSagas,
  ];

  yield all(sagas.map(saga => spawn(saga)));
}
