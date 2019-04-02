import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';


function* spotifySaga() {
    yield takeEvery('GENERATE_PLAYLIST', generatePlaylist);
    yield takeEvery('FETCH_ALL_PLAYLISTS', fetchAllPlaylists);
    yield takeEvery('FETCH_CURRENT_PLAYLIST', fetchCurrentPlaylist);
    yield takeEvery('UPDATE_CURRENT_PLAYLIST', updateCurrentPlaylist);
    yield takeEvery('REFRESH_CURRENT_PLAYLIST', refreshCurrentPlaylist);
    // yield takeEvery('FETCH_CURRENT_REFRESHED_PLAYLIST', fetchCurrentRefreshedPlaylist);
}

// create PUT route to server and create new playlist based on user input
function* generatePlaylist(action) {
    try {
        yield axios.put('api/spotify/playlist', action.payload);
    } catch (error) {
        console.log('this was an error with generating playlist');
    }
}

// fetch all playlists from current user and set to 'allPlaylistReducer'
function* fetchAllPlaylists() {
    try {
        let response = yield axios.get('api/spotify/all-playlists');
        yield dispatch({ type: 'SET_ALL_PLAYLISTS', payload: response.data })
    } catch (error) {
        console.log('this was an error fetching all playlists');
    }
}

// fetch current playlist and set to 'currentPlaylistReducer'
function* fetchCurrentPlaylist() {
    try {
        let response = yield axios.get('api/spotify/current-playlist');
        yield dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: response.data[0] })
    } catch (error) {
        console.log('this was an error fetching current playlist');
    }
}

// update playlist choosen from playlist board to 'current_playlist_id' on 'spotify_current' database table
function* updateCurrentPlaylist(action) {
    try {
        yield axios.put('api/spotify/update-current-playlist', action.payload);
    } catch (error) {
        console.log('this was an error updating current playlist');
    }
}

// refresh current playlist and initiate new tracklist request to Spotify API
function* refreshCurrentPlaylist(action) {
    try {
        yield axios.put('api/spotify/refresh-current-playlist', action.payload);
       
    } catch (error) {
        console.log('this was an error refreshing current playlist');
    }
}

// function* fetchCurrentRefreshedPlaylist() {
//     try {
//         let response = yield axios.get('api/spotify/current-playlist');
//         yield dispatch({ type: 'SET_CURRENT_PLAYLIST', payload: response.data[0] })
//     } catch (error) {
//         console.log('this was an error fetching current refreshed playlist');
//     }
// }


export default spotifySaga;