import axios from 'axios';
import { takeEvery, put as dispatch } from 'redux-saga/effects';


function* dateUpdateSaga() {
    yield takeEvery('SET_DATE_RANGE', setDateRange);
}

function* setDateRange(action) {
    try {
        console.log('inside set date range sage', action.payload)
        yield axios.put('api/spotify/set-dates', action.payload);
        // yield dispatch({ type: 'SET_GENRES', payload: genres.data });
    } catch (error) {
        console.log('this was an error with setting dates');
    }
}

export default dateUpdateSaga;