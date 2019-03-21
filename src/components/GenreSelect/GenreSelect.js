import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GenreSelect.css';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
// import DropDownMenuAlt from '../DropDownMenu/DropDownMenuAlt';


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
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(GenreSelect));