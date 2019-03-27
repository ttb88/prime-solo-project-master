import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NavBarPlayerPage.css';



class NavBar extends Component {

   
    render() {

        return (

            <nav>
                <ul>
                    <li class="sub-menu-parent-player" tab-index="0">
                        <a href="#"><i class="material-icons">graphic_eq</i></a>
                        <ul class="sub-menu-player">
                            <li><a href="#">Sub Item 1</a></li>
                            <li><a href="#">Sub Item 2</a></li>
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