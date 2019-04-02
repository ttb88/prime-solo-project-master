import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch current user from from 'spotify_user' table
function* fetchUser() {
  try {
    const response = yield axios.get('api/spotify/user');
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;
