import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SavedPlaylists.css';
import NavBar from '../NavBar/NavBar';
import PlaylistItem from './PlaylistItem';


class SavedPlaylists extends Component {

    state = {
        toggle: true,
        animation: 'fadeIn',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_PLAYLISTS' });
    }


    displayPlaylists = () => {
        return this.props.allPlaylists.map(playlist => 
        <PlaylistItem history={this.props.history} animation={this.state.animation} playlist={playlist} key={playlist.id}/>)
    }

    handleClick = () => {
        this.props.dispatch({ type: 'FETCH_IMAGES' });
        if (this.state.toggle) {
            this.setState({
                toggle: false,
                animation: 'fadeInTwo',
            })
        } else {
            this.setState({
                toggle: true,
                animation: 'fadeIn',
            })
        }
    }


    render() {

        return (
            <>
                <NavBar />
                <div className="select-page-header">
                    <h2>Playlist Board</h2>
                    <p>Available below are all your previous playlists.  Click 'replay' to enjoy again!</p>
                </div>
                <div className="playlist-grid-container">
                    {this.displayPlaylists()}
                </div>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(SavedPlaylists));