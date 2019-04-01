import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlayerPage.css';
import NavBarPlayerPage from '../NavBar/NavBarPlayerPage';



class PlayerPage extends Component {

    state = {
        fade: true,
        drawer: false,
        input: false,
        dateRange: {
            dateMin: 1920,
            dateMax: 2019,
            selectionID: this.props.currentPlaylist.selection_id,
        },
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_CURRENT_PLAYLIST' });
        this.setState({ 
            fade: true,
            drawer: false,
            input: false,
        })
    }

    handleRefreshTracks = () => {
        this.props.dispatch({ type: 'REFRESH_CURRENT_PLAYLIST', payload: this.props.currentPlaylist });
        this.setState({ fade: false })
        this.props.history.push("/playlist-gen-update");
    }

    handleOnChange = property => event => {
        this.setState ({
            dateRange: {
                ...this.state.dateRange,
                selectionID: this.props.currentPlaylist.selection_id,
                [property]: event.target.value,
            }  
        })
    }

    handleDateSubmit = () => {
        this.props.dispatch({type: 'SET_DATE_RANGE', payload: this.state.dateRange});
        this.setState({
            dateRange: {
                dateMin: '',
                dateMax: '',
            }
        })
        this.handleRefreshTracks();
    }


    fadeInToggle = () => {
        if (this.state.fade) {
            return 'new-background'
        }
        else { return '' }
    }

    displayDrawer = () => {
        if (!this.state.drawer) {
            return ''
        }
        if (this.state.drawer && !this.state.input) {
            return <div id="open-drawer">
                        <button className="more-options-button" onClick={this.handleRefreshTracks}>refresh playlist</button>
                        <button onClick={this.handleRenamePlaylist} className="more-options-button">set date range</button>
                    </div>
        }
        else {
            return <div id="open-drawer">
            <label>Date Range</label>
                <input className="rename-input" type="number" min="1820" placeholder='min' value={this.state.dateRange.dateMin} onChange={this.handleOnChange('dateMin')}></input>
                <span>to</span>
                <input className="rename-input" type="number" max="2019" placeholder='max' value={this.state.dateRange.dateMax} onChange={this.handleOnChange('dateMax')}></input>
                <button onClick={this.handleDateSubmit} className="more-options-button">submit</button>
                <button onClick={() => this.setState({ input: !this.state.input })} className="more-options-button">close</button>
                    </div>
        }
    }

    handleMoreOptionsClick = () => {
        this.setState({ drawer: !(this.state.drawer) });
        let element = document.getElementById("options-icon");
        element.classList.toggle("icon-rotate");
    }

    handleRenamePlaylist = () => {
        this.setState({ input: !(this.state.input) });
    }

    render() {
        console.log('currentPlaylistInfo', this.props.currentPlaylist);
        console.log('daterange', this.state.dateRange);
        

        return (

            <div style={{ backgroundImage: `linear-gradient(rgba(212, 212, 212, 0.3), rgba(138, 138, 138, 0.1)), url(images/full/${this.props.currentPlaylist.image_path})`}} id={this.state.fade} className="bckgrnd-container">

                <NavBarPlayerPage />

                <div className="playlist-widget">
                    <iframe title="Spotify Playlist Widget" src={`https://open.spotify.com/embed/user/${this.props.currentPlaylist.spotify_id}/playlist/${this.props.currentPlaylist.playlist_id}`}
                        width="800" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" ></iframe>
                    <div className="below-widget-div" >
                        <button className="more-options-button" onClick={this.handleMoreOptionsClick}><i className="material-icons" id="options-icon">graphic_eq</i>more options</button>
                        {this.displayDrawer()}
                    </div>
                </div>



            </div>

        );
    }
}


const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(PlayerPage));