import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavBar.css';



class NavBar extends Component {

   
    render() {

        return (

            <nav>
                <ul>
                    <li class="sub-menu-parent" tab-index="0">
                        <a><i class="material-icons">graphic_eq</i></a>
                        <ul class="sub-menu">
                            <li><a href="#/image">Create New</a></li>
                            <li><a href="#">Saved Playlists</a></li>
                        </ul></li>
                </ul>
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