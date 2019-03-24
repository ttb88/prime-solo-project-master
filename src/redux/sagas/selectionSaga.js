import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';

function* selectionSaga() {
    yield takeEvery('POST_SELECTIONS', postSelections);
}

function* postSelections(action) {
    try {
        console.log('post selections', action.payload);
        yield axios.post('api/spotify/selections', action.payload);
        // console.log('postSelctions saga', response.data);
        
    } catch (error) {
        console.log('this was an error with setting selection');
    }
}

// function* addGenre(action) {
//     try {
//         console.log('add image', action.payload);
//         yield axios.post('api/spotify/genre', action.payload);
//     } catch (error) {
//         console.log('this was an error with posting data');
//     }
// }

// function* getTracks() {
//     try {
//         const spotifyTracks = yield axios.get('api/spotify/token');
//         console.log('spotify tracks', spotifyTracks.data[0].id);
//     } catch (error) {
//         console.log('this was an error with fetching data');
//     }
// }

export default selectionSaga;