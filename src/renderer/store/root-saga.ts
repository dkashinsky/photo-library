import { all, spawn } from 'redux-saga/effects';
import locationSagas from './locations/sagas';

export const rootSaga = function* () {
  const sagas = [
    ...locationSagas,
  ];

  yield all(sagas.map(saga => spawn(saga)));
}
