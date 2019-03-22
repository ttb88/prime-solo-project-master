const playlistTracks = (state = [], action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SET_PLAYLIST_TRACKS':
            return action.payload;
        default:
            return state;
    }
};

export default playlistTracks;