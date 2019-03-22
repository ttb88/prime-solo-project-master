import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlaylistGenerator.css'



class PlaylistGenerator extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GENERATE_PLAYLIST' });
        this.move(); 
    }

 
    move = () => {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 60);
    console.log('id', id)
    let history = this.props.history;
   
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            history.push('/player')
        } 
        else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

handleClick = () => {
    this.props.history.push('/player');
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