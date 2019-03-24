import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputForm from '../PlaylistInfoInput/InputForm';


class PlaylistInfoInput extends Component {

    // componentDidMount() {
    //     this.props.dispatch({ type: 'FETCH_GENRES' });
    // }


    render() {

        return (
            <>
                <div className="center-contents">
                    <div className="grid-center-container">
                        <div className="grid-item-1">
                            <div className="header-text">
                                <h2>Name Playlist</h2>
                            </div>
                        </div>
                        <div className="grid-item-2">
                            <div className="input-fields">
                                <InputForm history={this.props.history} />
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


export default (connect(mapReduxStateToProps)(PlaylistInfoInput));