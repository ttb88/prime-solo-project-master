import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GenreSelect.css';
import DropDownMenu from '../DropDownMenu/DropDownMenu';


class GenreSelect extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENRES' });
    }


    render() {
        return (
            <>
                <div className="center-contents">
                <div className="grid-center-container">
                    <div className="grid-item-1">
                <div className="header-text">
                    <h2>Select Genre</h2>
                </div>
                </div>
                    <div className="grid-item-2">
                <div className="drop-down-menu">
                    <DropDownMenu history={this.props.history} />
                </div>
                </div>
                </div>
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