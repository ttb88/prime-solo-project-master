import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../ImageSelect/ImageSelect.css'

class ImageItem extends Component {

    handleImageClick = id => () => {
        this.props.dispatch({ type: 'SET_IMAGE', payload: id})
        this.props.history.push("/playlist-name");
    }

    randomNumber = () => {
        return Math.floor(Math.random() * 1.6) + 1;
    }

    randomNumberTwo = () => {
        return Math.random() -.1;
    }

    render() {
  
        return (
            <div className={`image-reveal image-grid-item${this.props.number}`} style={{ animationDelay: `${this.randomNumberTwo()}s`,
                animationName: this.props.animation, animationDuration: `${this.randomNumber()}s`}}>
                <img src={`images/small/${this.props.image.image_path}`} alt={this.props.image.id} onClick={this.handleImageClick(this.props.image.id)} />
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default (connect(mapReduxStateToProps)(ImageItem));