import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayerPage.css';
import axios from 'axios';

let jsonData = {
    name: 'testing playlist',
    public: false,
    description: 'first posted playlist',
}

let jsonDataTracks = {
    uris: ['spotify:track:4gfBpZ4uhsSUbpdDSvWY2k', 'spotify:track:4gfBpZ4uhsSUbpdDSvWY2k', 'spotify:track:4gfBpZ4uhsSUbpdDSvWY2k']
}

class PlayerPage extends Component {

    componentDidMount() {
        document.getElementById("new-background").style.backgroundImage = "url(images/photo-1441155472722-d17942a2b76a.jpeg)";
        this.props.dispatch({ type: 'FETCH_TRACKS' });
    }

    handleClick = () => {
        axios({
            method: 'POST',
            url: `https://api.spotify.com/v1/users/tbraasch/playlists`,
            data: jsonData,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + 'BQBRUQPM0bhv_WUVgiQUPwrcu2FBVMD10n4OXjHqewQHVOGyZK5ni6Djjy6s7outcrKD5E4W09ps-1uFe5r3lKd3RuLDdMcx6IRtWoznJUsb3g40iLEvJIUoFZmNxpXEBhV3izc2lIMzx8L03rGqAVdyYMGjJ2bn1Z3ID7jRMOJHJamudhuJwhBJOxIWHiptVSb8JOSa5HEoZWz05qNTQFyDNeufvnXslOcpR7fCB1hvJ2pIW0aBfoVkCg',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('res', res.data);
        })

    }

    handleAddTrack = () => {
        axios({
            method: 'POST',
            url: `https://api.spotify.com/v1/playlists/4lQeEBtHtsWVNVjFFTkFRn/tracks`,
            data: jsonDataTracks,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + 'BQBRUQPM0bhv_WUVgiQUPwrcu2FBVMD10n4OXjHqewQHVOGyZK5ni6Djjy6s7outcrKD5E4W09ps-1uFe5r3lKd3RuLDdMcx6IRtWoznJUsb3g40iLEvJIUoFZmNxpXEBhV3izc2lIMzx8L03rGqAVdyYMGjJ2bn1Z3ID7jRMOJHJamudhuJwhBJOxIWHiptVSb8JOSa5HEoZWz05qNTQFyDNeufvnXslOcpR7fCB1hvJ2pIW0aBfoVkCg',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('res', res.data);
        })

    }

    render() {

        return (
       
            <div id="new-background" className="bckgrnd-container"> 
            {/* <div className="center-contents">
                <h1>player page</h1>
            </div> */}
            <div className="playlist-widget">
                    <iframe src="https://open.spotify.com/embed/user/tbraasch/playlist/18penI6CU3lzOH1uHr20sw" 
                    width="800" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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