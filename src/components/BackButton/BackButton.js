import React, { Component } from 'react';
import { connect } from 'react-redux';


class BackButton extends Component {

    render() {

        return (
                <div>
                    <button onClick={() => this.props.history.go(-1)} className="back-button button">back</button>
                </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(BackButton));