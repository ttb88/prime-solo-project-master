import { combineReducers } from 'redux';
import images from './imageReducer';
import genres from './genreReducer';
import itemSelections from './selectReducer';
import playlistTracks from './playlistTracksReducer';
// import errors from './errorsReducer';
// import loginMode from './loginModeReducer';
// import user from './userReducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  // errors, // contains registrationMessage and loginMessage
  // loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  // user, // will have an id and username if someone is logged in
  images, // will include all image paths to images from 'image' table on database
  genres, //will include all genre paths to genre from 'genre' table on database
  itemSelections, //will hold all user selctions
  playlistTracks,
});

export default rootReducer;
