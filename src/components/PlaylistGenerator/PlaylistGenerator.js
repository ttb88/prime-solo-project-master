import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlaylistGenerator.css'


class PlaylistGenerator extends Component {

    componentDidMount() {
        this.move();
    }

    move = () => {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 60);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}


    render() {    
        return (
            <>
                <div className="header-text">
                    <h2>Playlist Generating</h2>
                </div>
                <div id="myProgress">
                    <div id="myBar"></div>
                </div>
            
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default (connect(mapReduxStateToProps)(PlaylistGenerator));