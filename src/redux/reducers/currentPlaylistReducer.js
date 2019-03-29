const currentPlaylist = (state = [], action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SET_CURRENT_PLAYLIST':
            return action.payload;
        default:
            return state;
    }
};

export default currentPlaylist;