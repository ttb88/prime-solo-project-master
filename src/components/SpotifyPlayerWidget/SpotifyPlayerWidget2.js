import React, { Component } from 'react';
import { connect } from 'react-redux';


class SpotifyPlayerWidget2 extends Component {

    render() {

        return (
            <div className="playlist-widget">
                <iframe title="Spotify Playlist Widget" src={`https://open.spotify.com/embed/user/${this.props.currentPlaylist.spotify_id}/playlist/${this.props.currentPlaylistInfo.playlist_id}`}
                    width="800" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>



        );
    }
}


const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(SpotifyPlayerWidget2));