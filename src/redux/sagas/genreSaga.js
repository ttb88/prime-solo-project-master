import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';


function* genreSaga() {
    yield takeEvery('FETCH_GENRES', fetchGenres);
}

function* fetchGenres() {
    try {
        const genres = yield axios.get('/api/image');
        console.log('genre reponse', genres.data);
        yield dispatch({ type: 'SET_GENRES', payload: genres.data });
    } catch (error) {
        console.log('this was an error with fetching data');
    }
}

export default genreSaga;