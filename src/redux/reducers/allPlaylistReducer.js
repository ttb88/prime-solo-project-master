const allPlaylistInfo = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_PLAYLISTS':
            return action.payload;
        default:
            return state;
    }
};

export default allPlaylistInfo;