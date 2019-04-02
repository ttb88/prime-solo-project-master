import axios from 'axios';
import { takeEvery} from 'redux-saga/effects';


function* dateUpdateSaga() {
    yield takeEvery('SET_DATE_RANGE', setDateRange);
}

// send updated data range to server and update server
function* setDateRange(action) {
    try {
        console.log('inside set date range sage', action.payload)
        yield axios.put('api/spotify/set-dates', action.payload);
    } catch (error) {
        console.log('this was an error with setting dates');
    }
}

export default dateUpdateSaga;