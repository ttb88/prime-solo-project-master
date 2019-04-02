import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavBarPlayerPage.css';

class NavBar extends Component {

    render() {

        return (
            <nav>
                <ul>
                    <li className="sub-menu-parent-player" tab-index="0">
                        <a><i className="material-icons">graphic_eq</i></a>
                        <ul className="sub-menu-player">
                            <li><a href="#/genre">Create New</a></li>
                            <li><a href="#/saved-playlists">Saved Playlists</a></li>
                            <li ><a href="https://accounts.spotify.com/en/status">Log Out</a></li>
                        </ul></li>
                </ul>
                <div className="text-logo"><h2>stream</h2></div>
            </nav>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(NavBar));