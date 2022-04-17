import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
