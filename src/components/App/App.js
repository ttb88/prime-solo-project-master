import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import ImageSelect from '../ImageSelect/ImageSelect';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="bckgrnd-container">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/image" component={ImageSelect} />
        </div>
      </Router>
  )}
}

export default App;
