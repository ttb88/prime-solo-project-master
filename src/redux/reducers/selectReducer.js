const selectedItems = {
    selection_name: '',
    image_id: '',
    genre_id: '',
    

   
}


const selectReducer = (state = selectedItems, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SET_IMAGE':
            return {
                ...state,
                image: action.payload,
            }
        case 'SET_GENRE':
            return {
                ...state,
                genre_id: action.payload,
            }
        default:
            return state;
    }
};

export default selectReducer;