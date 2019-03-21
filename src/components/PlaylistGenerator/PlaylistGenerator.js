import React, { Component } from 'react';
import { connect } from 'react-redux';


class PlaylistGenerator extends Component {


    render() {
        return (
            <>
                <div className="genre-text">
                    <h2>Select Genre</h2>
                </div>
            
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default (connect(mapReduxStateToProps)(PlaylistGenerator));