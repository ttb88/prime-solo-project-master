import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';


function* imageSaga() {
    yield takeEvery('FETCH_IMAGES', fetchImages);
}

function* fetchImages() {
    try {
        const images = yield axios.get('/api/image');
        console.log('image reponse', images.data);
        yield dispatch({ type: 'SET_IMAGES', payload: images.data });
    } catch (error) {
        console.log('this was an error with fetching data');
    }
}

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

export default imageSaga;