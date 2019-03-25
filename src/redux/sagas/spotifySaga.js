import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';
import selectReducer from '../reducers/selectReducer';



function* spotifySaga() {
    yield takeEvery('GENERATE_PLAYLIST', generatePlaylist);
    yield takeEvery('FETCH_CURRENT_PLAYLIST', fetchPlaylists);
    // yield takeEvery('FETCH_TRACKS', getTracks)
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
        let response = yield axios.get('api/playlist');
        console.log(`user's playlists`, response.data);
        yield dispatch({ type: 'SET_USER_PLAYLISTS', payload: response.data[0] })
    } catch (error) {
        console.log('this was an error fetching playlists');
    }
}

// function* getTracks() {
//     try {
//         // const spotifyTracks = yield axios.get('api/spotify/token');
//         // console.log('spotify tracks',spotifyTracks.data[0].uri);
//         // let playlistTracks = spotifyTracks.data.map(track => track.uri);
//         // console.log('allTracks', playlistTracks);
//          // yield dispatch({type: 'SET_PLAYLIST_TRACKS', payload: playlistTracks})
//         yield axios.post('api/spotify/playlist');
//         const embedURL = yield axios.get('api/spotify/widgetURL');
//         console.log('embedURL', embedURL.data);
        
//     } catch (error) {
//         console.log('this was an error with fetching data');
//     }
// }

// function* setToken(action) {
//     console.log('setToken was hit');
//     try {
//         console.log('set token', action.payload);
//         yield axios({
//             method: 'PUT',
//             url: '/token/' + action.payload.id,
//             data: {
//                 access_token: action.payload.accessToken,
//             }
//         })
//         yield dispatch({type:'FETCH_TOKEN'});
//     } catch (error) {
//         console.log('this was an error with the token fetch');
//     }
// }



// function* deleteItem(action) {
//     try {
//         console.log('postitem', action.payload);
//         yield axios.delete('api/shelf/' + action.payload);
//         yield dispatch({ type: 'FETCH_ITEM' });
//     } catch (error) {
//         console.log('this was an error with the delete- probably TJs fault');

//     }
// }

export default spotifySaga;