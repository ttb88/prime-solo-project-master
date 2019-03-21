import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../ImageSelect/ImageSelect.css'

// let array = [1, 2, 3, 4, 5, 6]

// for (var a = [], i = 0; i < 6; ++i) a[i] = i;

// function shuffle(array) {
//     var tmp, current, top = array.length;
//     if (top) while (--top) {
//         current = Math.floor(Math.random() * (top + 1));
//         tmp = array[current];
//         array[current] = array[top];
//         array[top] = tmp;
//     }
//     return array;
// }

// a = shuffle(a);




class ImageItem extends Component {

    handleImageClick = id => () => {
        this.props.dispatch({ type: 'SET_SELECTED_IMAGE', payload: id})
        this.props.history.push("/genre");
    }

    render() {
  
        return (
            <div className={`image-grid-item${this.props.number}`}>
                <img src={this.props.image.image_path} alt={this.props.image.id} onClick={this.handleImageClick(this.props.image.id)} />
            </div>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(ImageItem));