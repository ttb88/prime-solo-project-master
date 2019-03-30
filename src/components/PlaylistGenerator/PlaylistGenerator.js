import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlaylistGenerator.css'



class PlaylistGenerator extends Component {

    componentDidMount () {
        this.props.dispatch({ type: 'GENERATE_PLAYLIST', payload: this.props.itemSelections });
        // this.props.dispatch({ type: 'FETCH_CURRENT_PLAYLIST' });
        this.move(); 
        
    }

 
    move = () => {
    let elem = document.getElementById("myBar");
    let width = 1;
    let id = setInterval(frame, 60);
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

        console.log(this.props.itemSelections)
        return (
            <> <div className="center-contents">
                <div className="grid-center-container">
                <div className="header-text">
                    <h2>Generating Your Playlist</h2>
                </div>
                <div id="myProgress">
                    <div id="myBar"></div>
                </div>
                </div>
            </div>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(PlaylistGenerator));