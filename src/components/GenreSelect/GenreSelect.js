import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import BackButton from '../BackButton/BackButton';


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
                <button onClick={() => this.props.history.push('/image')} className="back-button button">back</button>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(GenreSelect));