import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';


function* spotifySaga() {
    yield takeEvery('GENERATE_PLAYLIST', generatePlaylist);
    yield takeEvery('FETCH_ALL_PLAYLISTS', fetchAllPlaylists);
    yield takeEvery('FETCH_CURRENT_PLAYLIST', fetchCurrentPlaylist);
    yield takeEvery('UPDATE_CURRENT_PLAYLIST', updateCurrentPlaylist);
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

function* fetchAllPlaylists() {
    try {
        let response = yield axios.get('api/spotify/all-playlists');
        console.log(`user's playlists`, response.data);
        // yield dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: response.data[0] })
        yield dispatch({ type: 'SET_ALL_PLAYLISTS', payload: response.data })
    } catch (error) {
        console.log('this was an error fetching all playlists');
    }
}

function* fetchCurrentPlaylist() {
    try {
        let response = yield axios.get('api/spotify/current-playlist');
        console.log(`user's playlists`, response.data);
        // yield dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: response.data[0] })
        yield dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: response.data[0] })
    } catch (error) {
        console.log('this was an error fetching current playlist');
    }
}

function* updateCurrentPlaylist(action) {
    try {
        yield axios.put('api/spotify/update-current-playlist', action.payload);
        console.log('updatecurrentplaylist payload', action.payload);
    } catch (error) {
        console.log('this was an error updating current playlist');
    }
}


export default spotifySaga;