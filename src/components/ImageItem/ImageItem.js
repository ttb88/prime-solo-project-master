import React, { Component } from 'react';
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

    handleImageClick = image => () => {
        let selectedImage= image;
    }

    render() {
  
        return (
            <div className={`image-grid-item${this.props.number}`}>
                <img src={this.props.image.image_path} alt={this.props.image.id} onClick={this.handleImageClick(this.props.image)} />
            </div>
        );
    }
}

export default ImageItem;