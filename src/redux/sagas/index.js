import { all } from 'redux-saga/effects';
import spotifySaga from './spotifySaga';
import imageSaga from './imageSaga';
import genreSaga from './genreSaga';
import dateUpdateSaga from './dateUpdateSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

export default function* rootSaga() {
  yield all([
    spotifySaga(),
    imageSaga(),
    genreSaga(),
    dateUpdateSaga(),
  ]);
}
