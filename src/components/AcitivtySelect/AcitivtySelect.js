import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityDropDownMenu from '../ActivitySelect/ActivityDropDownMenu';
import NavBar from '../NavBar/NavBar';


class ActivitySelect extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENRES' });
    }



    render() {

        return (
            <>
                <NavBar />
                <div className="center-contents">
                    <div className="grid-center-container">
                        <div className="grid-item-1">
                            <div className="header-text">
                                <h2>Select Activity</h2>
                            </div>
                        </div>
                        <div className="grid-item-2">
                            <div className="drop-down-menu">
                                <ActivityDropDownMenu history={this.props.history} />
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


export default (connect(mapReduxStateToProps)(ActivitySelect));