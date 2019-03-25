const genreReducer = (state = [], action) => {
    // console.log(action.payload)
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
};

export default genreReducer;