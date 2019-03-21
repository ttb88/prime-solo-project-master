import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles';
import HomePage from '../HomePage/HomePage';
import ImageSelect from '../ImageSelect/ImageSelect';
import GenreSelect from '../GenreSelect/GenreSelect';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#004e63d2',
      dark: '#004e63d2',
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
      'Comfortaa',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: '15',
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
          <Route exact path="/image" component={ImageSelect} />
          <Route exact path="/genre" component={GenreSelect} />
        </div>
      </Router>
      </MuiThemeProvider>
  )}
}

export default App;
