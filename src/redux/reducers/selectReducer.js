const selectedItems = {
    spotify_id: '',
    image_id: '',
    genre_id: '',
    playlist_title: '',
    playlist_description: '',  
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
        case 'SET_PLAYLIST_INFO':
            return {
                ...state,
                playlist_title: action.payload.title,
                playlist_description: action.payload.description,
            }
        default:
            return state;
    }
};

export default selectReducer;