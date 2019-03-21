import React, { Component } from 'react';
import './PlayerPage';


class PlayerPage extends Component {

    componentDidMount() {
        document.getElementById("new-background").style.backgroundImage = "url(images/photo-1452723312111-3a7d0db0e024.jpeg)";
    }

  
    

    render() {

        return (
            <div id="new-background" className="bckgrnd-container">
            <div className="center-contents">
                <h1>player page</h1>
            </div>
            </div>
        );
    }
}


export default PlayerPage;