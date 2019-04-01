const selectedItems = {
    spotify_id: '',
    image_id: '',
    genre_id: '',
    energy_value: '',
    mood_value: '',
    playlist_title: '',
    playlist_description: '',  
    dateMin: 1920,
    dateMax: 2019,
}


const selectReducer = (state = selectedItems, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                spotify_id: action.payload.spotify_id,
            }
        case 'SET_IMAGE':
            return {
                ...state,
                image_id: action.payload,
            }
        case 'SET_GENRE':
            return {
                ...state,
                genre_id: action.payload,
            }
        case 'SET_ENERGY':
            return {
                ...state,
                energy_value: action.payload,
            }
        case 'SET_MOOD':
            return {
                ...state,
                mood_value: action.payload,
            }
        case 'SET_PLAYLIST_INFO':
            return {
                ...state,
                playlist_title: action.payload.title,
                playlist_description: action.payload.description,
            }
        case 'SET_DATE_RANGE':
            return {
                ...state,
                dateMin: action.payload.dateMin == '' ? 1920 : action.payload.dateMin,
                dateMax: action.payload.dateMin == '' ? 2019 : action.payload.dateMax,
            }
        default:
            return state;
    }
};

export default selectReducer;