import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavBar.css';


class NavBar extends Component {

   
    render() {

        return (
            <>
            <nav>
                <ul>
                    <li class="sub-menu-parent" tab-index="0">
                        <a><i class="material-icons">graphic_eq</i></a>
                        <ul class="sub-menu">
                            <li><a href="#/image">Create New</a></li>
                            <li ><a href="#">Saved Playlists</a></li>
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