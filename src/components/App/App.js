import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles';
import HomePage from '../HomePage/HomePage';
import ImageSelect from '../ImageSelect/ImageSelect';
import GenreSelect from '../GenreSelect/GenreSelect';
import PlayerPage from '../PlayerPage/PlayerPage';
import PlaylistInfoInput from '../PlaylistInfoInput/PlaylistInfoInput';
import './App.css';
import PlaylistGenerator from '../PlaylistGenerator/PlaylistGenerator';
import EnergySelect from '../EnergySelect/EnergySelect';
import MoodSelect from '../MoodSelect/MoodSelect';
import SavedPlaylists from '../SavedPlaylists/SavedPlaylists';
import BlankOpen from '../BlankOpen/BlankOpen';
import PlaylistUpdateGenerator from '../PlaylistGenerator/PlaylistUpdateGenerator';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#004e63',
      dark: '#004e63',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'Raleway',
      'Italiana',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: '18',
    useNextVariants: true,
  },
})

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Router>
        <div className="bckgrnd-container">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/genre" component={GenreSelect} />
          <Route exact path="/energy" component={EnergySelect} />
          <Route exact path="/mood" component={MoodSelect} />
          <Route exact path="/image" component={ImageSelect} />
          <Route exact path="/playlist-name" component={PlaylistInfoInput} />
          <Route exact path="/playlist-gen" component={PlaylistGenerator} />
          <Route exact path="/playlist-gen-update" component={PlaylistUpdateGenerator} />
          <Route exact path="/player" component={PlayerPage} />
          <Route exact path="/saved-playlists" component={SavedPlaylists} />
        </div>
      </Router>
      </MuiThemeProvider>
  )}
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}


export default (connect(mapReduxStateToProps)(App));
