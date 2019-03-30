import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayerPage.css';
import NavBarPlayerPage from '../NavBar/NavBarPlayerPage';
// import SpotifyPlayerWidget from '../SpotifyPlayerWidget/SpotifyPlayerWidget';
// import SpotifyPlayerWidget2 from '../SpotifyPlayerWidget/SpotifyPlayerWidget2';



class PlayerPage extends Component {


    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_PLAYLIST' });
    }


    handleRefreshTracks = () => {
        
        this.props.dispatch({ type: 'REFRESH_CURRENT_PLAYLIST', payload: this.props.currentPlaylist});
        window.location.reload(); 
        // this.props.history.push("/playlist-gen-update");
    }


    render() {
        console.log('currentPlaylistInfo', this.props.currentPlaylist);
    
        return (
           
            <div style={{ backgroundImage: `linear-gradient(rgba(212, 212, 212, 0.3), rgba(138, 138, 138, 0.1)), url(images/full/${this.props.currentPlaylist.image_path})` }} id="new-background" className="bckgrnd-container">

                <NavBarPlayerPage />
                <div className="playlist-widget">
                    <iframe title="Spotify Playlist Widget" src={`https://open.spotify.com/embed/user/${this.props.currentPlaylist.spotify_id}/playlist/${this.props.currentPlaylist.playlist_id}`}
                        width="800" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
            {/* <button onClick={this.handleClick}>get playlist</button> */ }
                <button onClick={this.handleRefreshTracks}>refresh playlist</button>
            </div>
       
        );
    }
}


const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(PlayerPage));