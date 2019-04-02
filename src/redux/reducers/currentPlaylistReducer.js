const currentPlaylist = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENT_PLAYLIST':
            return action.payload;
        default:
            return state;
    }
};

export default currentPlaylist;