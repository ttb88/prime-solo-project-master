import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';

// fetch all genres from 'genre' table and set within 'genreReducer.js'
function* genreSaga() {
    yield takeEvery('FETCH_GENRES', fetchGenres);
}

function* fetchGenres() {
    try {
        const genres = yield axios.get('api/genre');
        yield dispatch({ type: 'SET_GENRES', payload: genres.data });
    } catch (error) {
        console.log('this was an error with fetching data');
    }
}

export default genreSaga;