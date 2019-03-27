import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageItem from '../ImageItem/ImageItem';
import './ImageSelect.css';
import NavBar from '../NavBar/NavBar';


class ImageSelect extends Component {

    prevImages = [];

    state = {
        toggle: true,
        animation: 'fadeIn',
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_IMAGES' });
        this.props.dispatch({type: 'FETCH_USER'});
    }


    displayImages = () => {
        console.log('shuffle clicked');
        let images = this.props.images;
        let lastImages = this.prevImages.map(image => image.id);
        console.log('last 6 images', lastImages );
        // console.log('this.prevImages are filter', this.prevImages);
        images = images.filter(image => !lastImages.includes(image.id));
        console.log('new 24 images', images);
        let shuffled = images.sort(() => 0.5 - Math.random());
        // console.log('shuffled', shuffled );
        let selected = shuffled.slice(0, 6);
        this.prevImages = selected;
        console.log('selected 6 images', selected);
        console.log('selected 6 images this.prev', this.prevImages);
        
        let number = 1
        return selected.map(image => <ImageItem history={this.props.history} animation={this.state.animation} image={image} number={number++} key={image.id} />)
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
                    <h2>Select Image</h2>
                    <p>Which image are you most drawn to in the present moment... click!
                        <br />For more options click on shuffle below.</p>
                </div>
                <div className="images-grid-container">
                    {this.displayImages()}
                </div>
                {/* <button onClick={() => this.props.dispatch({ type: 'FETCH_IMAGES' })} className="shuffle-button button">shuffle</button> */}
                <button onClick={this.handleClick} className="shuffle-button button">shuffle</button>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(ImageSelect));