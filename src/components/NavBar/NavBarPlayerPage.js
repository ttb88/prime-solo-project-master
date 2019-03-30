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

            // <ul>
            //     <li class="dropdown">
            //         <a href="javascript:void(0)" class="dropbtn"><i class="material-icons">graphic_eq</i></a>
            //         <div class="dropdown-content">
            //             <a href="#">Link 1</a>
            //             <a href="#">Link 2</a>
            //             <a href="#">Link 3</a>
            //         </div>
            //     </li>
            // </ul>

            
            // <div className="nav-container">
            //     <i class="material-icons">graphic_eq</i>
            //     <h2>stream</h2>
            // </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(NavBar));