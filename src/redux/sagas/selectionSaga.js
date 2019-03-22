import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';

function* selectionSaga() {
    yield takeEvery('ADD_IMAGE', addImage);
    yield takeEvery('ADD_GENRE', addGenre);
}

function* addImage(action) {
    try {
        console.log('add image', action.payload);
        yield axios.post('api/spotify/image', action.payload);
    } catch (error) {
        console.log('this was an error with posting data');
    }
}

function* addGenre(action) {
    try {
        console.log('add image', action.payload);
        yield axios.post('api/spotify/genre', action.payload);
    } catch (error) {
        console.log('this was an error with posting data');
    }
}

// function* getTracks() {
//     try {
//         const spotifyTracks = yield axios.get('api/spotify/token');
//         console.log('spotify tracks', spotifyTracks.data[0].id);
//     } catch (error) {
//         console.log('this was an error with fetching data');
//     }
// }

export default selectionSaga;