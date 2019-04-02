import React, { Component } from 'react';
import './HomePage.css'

class HomePage extends Component {
    handleClick = () => {
        window.location.replace('https://prime-solo-project-stream.herokuapp.com/spotify-auth/login');
    }

    render() {

        return (
            <>
                <div className="center-contents">
                    <div className="grid-center-container">
                        <div className="grid-item-1">
                            <h1><i className="material-icons stream-icon">graphic_eq</i>stream</h1>
                        </div >
                        <div className="grid-item-2">
                            <button className="create-playlist-button" onClick={this.handleClick}><i className="material-icons">graphic_eq</i>create playlist</button>
                        </div>


                    </div>
                </div>
            </>
        );
    }
}


export default HomePage;