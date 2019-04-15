import genreReducer from '../../redux/reducers/genreReducer';
import selectReducer from '../../redux/reducers/selectReducer';


const selectedItems = {
    spotify_id: '',
    image_id: '',
    genre_id: '',
    energy_value: '',
    mood_value: '',
    playlist_title: '',
    playlist_description: '',
    date_min: 1500,
    date_max: 2019,
}

//suite of testing
describe('Testing selectReducer', () => {
    test('should have the correct initial state', () => {
        const action = { type: 'INITIALIZE'};
        const returnedState = genreReducer(undefined, action);
        expect(returnedState).toEqual([]);
        //expect({}).toBe({});
        //expect({}).toEqual({});
    })
    test('should have the correct initial state', () => {
        const action = { type: 'INITIALIZE' };
        const returnedState = selectReducer(undefined, action);
        expect(returnedState).toEqual(selectedItems);
    })

})
