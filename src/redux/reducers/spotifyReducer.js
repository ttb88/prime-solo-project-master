const spotifyAPI = (state = [], action) => {
    console.log (action.payload)
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default spotifyAPI;