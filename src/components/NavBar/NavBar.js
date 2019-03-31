import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavBar.css';


class NavBar extends Component {

   
    render() {

        return (
            <>
            <nav>
                <ul>
                    <li className="sub-menu-parent" tab-index="0">
                        <a><i className="material-icons">graphic_eq</i></a>
                        <ul className="sub-menu">
                            <li><a href="#/genre">Create New</a></li>
                            <li ><a href="#/saved-playlists">Saved Playlists</a></li>
                            <li ><a href="https://accounts.spotify.com/en/status">Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

        

            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(NavBar));