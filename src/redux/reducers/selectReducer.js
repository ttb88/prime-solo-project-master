const selectedItems = {
    spotify_id: '',
    image_id: '',
    genre_id: '',
    energy_value: '',
    mood_value: '',
    playlist_title: '',
    playlist_description: '',  
    date_min: 1600,
    date_max: 2019,
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
                date_min: action.payload.dateMin === '' || !action.payload.dateMin ? 1600 : action.payload.dateMin,
                date_max: action.payload.dateMax === '' || !action.payloaddateMax ? 2019 : action.payload.dateMax,
            }
        default:
            return state;
    }
};

export default selectReducer;