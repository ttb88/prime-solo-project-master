import React, { Component } from 'react';
import { connect } from 'react-redux';

class BlankOpen extends Component {



    render() {

        return (
            <>
            <div className="blank-open" onClick={() => this.props.history.push("/home")}></div>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(BlankOpen));