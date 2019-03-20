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

export default imageSaga;