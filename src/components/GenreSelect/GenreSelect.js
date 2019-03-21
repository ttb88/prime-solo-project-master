import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GenreSelect.css';
import DropDownMenu from '../DropDownMenu/DropDownMenu';


class GenreSelect extends Component {


    render() {
        return (
            <>
                <div className="genre-text">
                    <h2>Select Genre</h2>
                </div>
                <div className="drop-down-menu">
                    <DropDownMenu />
                </div>
                {/* <button className="next-button" onClick={this.handleClick}>next</button> */}
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(GenreSelect));