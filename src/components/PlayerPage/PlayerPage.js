import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayerPage.css';
import NavBarPlayerPage from '../NavBar/NavBarPlayerPage';



class PlayerPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_PLAYLIST' });
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
    //     this.props.history.push('/image');
    // }



    render() {
        console.log('currentPlaylistInfo', this.props.currentPlaylist);

        return (
          

            <div style={{ backgroundImage: `linear-gradient(rgba(212, 212, 212, 0.1), rgba(138, 138, 138, 0.1)), url(images/full/${this.props.currentPlaylist.image_path})` }} id="new-background" className="bckgrnd-container">

                <NavBarPlayerPage />


                <div className="playlist-widget">
                    <iframe title="Spotify Playlist Widget" src={`https://open.spotify.com/embed/user/${this.props.currentPlaylist.spotify_id}/playlist/${this.props.currentPlaylist.playlist_id}`}
                        width="800" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
           
          
             
               
                 
            {/* <button onClick={this.handleClick}>get playlist</button> */ }
        {/* <button onClick={this.handleAddTrack}>new playlist</button> */ }
              

            
            </div>
       
        );
    }
}


const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(PlayerPage));