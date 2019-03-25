const currentPlaylistInfo = (state = '', action) => {
    console.log (action.payload)
    switch (action.type) {
        case 'SET_USER_PLAYLISTS':
            return action.payload;
        default:
            return state;
    }
};

export default currentPlaylistInfo;