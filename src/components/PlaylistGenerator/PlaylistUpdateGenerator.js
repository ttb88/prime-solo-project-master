import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlaylistGenerator.css'



class PlaylistGenerator extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_CURRENT_PLAYLIST' });
        this.move();

    }


    move = () => {
        let elem = document.getElementById("myBar");
        let width = 1;
        let id = setInterval(frame, 30);
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


    render() {

        console.log(this.props.itemSelections)
        return (
            <>
                <div style={{ backgroundImage: `linear-gradient(rgba(212, 212, 212, 0.3), rgba(138, 138, 138, 0.1)), url(images/full/${this.props.currentPlaylist.image_path})`}} className="bckgrnd-container">
                    <div className="center-contents" style={{ animationName: 'none' }} >
                        <div className="grid-center-container">
                            <div className="header-text">
                                <h2>Refreshing Your Playlist</h2>
                            </div>
                            <div id="myProgress">
                                <div id="myBar"></div>
                            </div>
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