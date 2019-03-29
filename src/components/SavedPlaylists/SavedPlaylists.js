import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SavedPlaylists.css';
import NavBar from '../NavBar/NavBar';
import PlaylistItem from './PlaylistItem';


class SavedPlaylists extends Component {

    prevImages = [];

    state = {
        toggle: true,
        animation: 'fadeIn',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ALL_PLAYLISTS' });
        // this.props.dispatch({ type: 'FETCH_IMAGES' });
        // this.props.dispatch({ type: 'FETCH_USER' });
    }


    displayImages = () => {
        // console.log('shuffle clicked');
        // let images = this.props.images;
        // let lastImages = this.prevImages.map(image => image.id);
        // console.log('last 6 images', lastImages);
        // // console.log('this.prevImages are filter', this.prevImages);
        // images = images.filter(image => !lastImages.includes(image.id));
        // console.log('new 24 images', images);
        // let shuffled = images.sort(() => 0.5 - Math.random());
        // // console.log('shuffled', shuffled );
        // let selected = shuffled.slice(0, 6);
        // this.prevImages = selected;
        // console.log('selected 6 images', selected);
        // console.log('selected 6 images this.prev', this.prevImages);

        // let number = 1
        return this.props.allPlaylists.map(playlist => <PlaylistItem history={this.props.history} animation={this.state.animation} playlist={playlist} key={playlist.id} />)
    }

    handleClick = () => {
        this.props.dispatch({ type: 'FETCH_IMAGES' });
        if (this.state.toggle) {
            this.setState({
                toggle: false,
                animation: 'fadeInTwo',
            })
        } else {
            this.setState({
                toggle: true,
                animation: 'fadeIn',
            })
        }
    }


    render() {

        return (
            <>
                <NavBar />
                <div className="select-page-header">
                    <h2>Playlist Board</h2>
                    <p>Available below are all your previous playlists.  Click 'replay' to enjoy again!
                        {/* <br />For more options click on shuffle below. */}
                        </p>
                </div>
                <div className="playlist-grid-container">
                    {this.displayImages()}
                </div>
                {/* <button onClick={() => this.props.dispatch({ type: 'FETCH_IMAGES' })} className="shuffle-button button">shuffle</button> */}
                {/* <button onClick={this.handleClick} className="shuffle-button button">shuffle</button> */}
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(SavedPlaylists));