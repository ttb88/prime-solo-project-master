import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayerPage.css';


class PlayerPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_PLAYLIST' });
        document.getElementById("new-background").style.backgroundImage = "url(images/photo-1441155472722-d17942a2b76a.jpeg)";
        
    }

    // handleClick = () => {
    //     axios({
    //         method: 'POST',
    //         url: `https://api.spotify.com/v1/users/tbraasch/playlists`,
    //         data: jsonData,
    //         dataType: 'json',
    //         headers: {
    //             'Authorization': 'Bearer ' + 'BQBRUQPM0bhv_WUVgiQUPwrcu2FBVMD10n4OXjHqewQHVOGyZK5ni6Djjy6s7outcrKD5E4W09ps-1uFe5r3lKd3RuLDdMcx6IRtWoznJUsb3g40iLEvJIUoFZmNxpXEBhV3izc2lIMzx8L03rGqAVdyYMGjJ2bn1Z3ID7jRMOJHJamudhuJwhBJOxIWHiptVSb8JOSa5HEoZWz05qNTQFyDNeufvnXslOcpR7fCB1hvJ2pIW0aBfoVkCg',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => {
    //         console.log('res', res.data);
    //     })

    // }

    // handleAddTrack = () => {
    //     axios({
    //         method: 'POST',
    //         url: `https://api.spotify.com/v1/playlists/4lQeEBtHtsWVNVjFFTkFRn/tracks`,
    //         data: jsonDataTracks,
    //         dataType: 'json',
    //         headers: {
    //             'Authorization': 'Bearer ' + 'BQBRUQPM0bhv_WUVgiQUPwrcu2FBVMD10n4OXjHqewQHVOGyZK5ni6Djjy6s7outcrKD5E4W09ps-1uFe5r3lKd3RuLDdMcx6IRtWoznJUsb3g40iLEvJIUoFZmNxpXEBhV3izc2lIMzx8L03rGqAVdyYMGjJ2bn1Z3ID7jRMOJHJamudhuJwhBJOxIWHiptVSb8JOSa5HEoZWz05qNTQFyDNeufvnXslOcpR7fCB1hvJ2pIW0aBfoVkCg',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => {
    //         console.log('res', res.data);
    //     })

    // }

 


    render() {

        console.log('currentPlaylistInfo', this.props.currentPlaylistInfo.id);
        


        return (
      
            <div id="new-background" className="bckgrnd-container"> 

           <div className="playlist-widget">
                    <iframe title="Spotify Playlist Widget" src={`https://open.spotify.com/embed/user/${this.props.currentPlaylistInfo.spotify_id}/playlist/${this.props.currentPlaylistInfo.playlist_id}`}
                    width="800" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div> 

               
                 
            {/* <button onClick={this.handleClick}>get playlist</button>
            <button onClick={this.handleAddTrack}>add track</button> */}
                </div>
       
        );
    }
}


const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(PlayerPage));