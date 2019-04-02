import { combineReducers } from 'redux';
import images from './imageReducer';
import genres from './genreReducer';
import itemSelections from './selectReducer';
// import currentPlaylistInfo from './spotifyReducer';
import allPlaylists from './allPlaylistReducer';
import currentPlaylist from './currentPlaylistReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  images, // will include all image paths to images from 'image' table on database
  genres, //will include all genre paths to genre from 'genre' table on database
  itemSelections, //will hold all user selctions
  // currentPlaylistInfo,
  allPlaylists, //will hold all playlist from current user
  currentPlaylist, //will hold information from currently selected playlist
});

export default rootReducer;
