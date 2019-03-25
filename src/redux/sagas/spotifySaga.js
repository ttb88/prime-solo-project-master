import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';


function* spotifySaga() {
    yield takeEvery('GENERATE_PLAYLIST', generatePlaylist);
    yield takeEvery('FETCH_CURRENT_PLAYLIST', fetchPlaylists);
}

function* generatePlaylist(action) {
    try {
        let response = yield axios.put('api/spotify/playlist', action.payload);
        console.log('current playlist', response);
        // yield dispatch ({ type: 'SET_CURRENT_PLAYLIST', payload: response.data})
    } catch (error) {
        console.log('this was an error with generating playlist');
    }
}

function* fetchPlaylists() {
    try {
        let response = yield axios.get('api/spotify/playlist');
        console.log(`user's playlists`, response.data);
        yield dispatch({ type: 'SET_USER_PLAYLISTS', payload: response.data[0] })
    } catch (error) {
        console.log('this was an error fetching playlists');
    }
}


export default spotifySaga;