const imageReducer = (state = [], action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
};

export default imageReducer;