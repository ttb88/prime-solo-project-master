const selectedItems = {
    image_id: '',
    genre_id: '',
}


const selectReducer = (state = selectedItems, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SET_SELECTED_IMAGE':
            return {
                ...this.state,
                image_id: action.payload
            }
        case 'SET_SELECTED_GENRE':
            return{
                ...this.state,
                genre_id: action.payload
            }
        default:
            return state;
    }
};

export default selectReducer;