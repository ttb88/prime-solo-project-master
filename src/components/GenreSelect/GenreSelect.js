import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from './GenreDropDownMenu';
import NavBar from '../NavBar/NavBar';


class GenreSelect extends Component {

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
                                <h2>Select Genre</h2>
                                {/* <p>Mix and match up to 5 genres in your search.
                        <br />The more you select the more music to discover.</p> */}
                            </div>
                        </div>
                        <div className="grid-item-2">
                            <div className="drop-down-menu">
                                <DropDownMenu history={this.props.history} />
                            </div>
                        </div>

                    </div>


                </div>
                {/* <button onClick={() => this.props.history.push('/image')} className="back-button button">back</button> */}
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(GenreSelect));