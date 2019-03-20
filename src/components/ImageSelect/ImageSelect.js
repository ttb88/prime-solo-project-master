import React, { Component } from 'react';
import './ImageSelect.css';


class ImageSelect extends Component {
    handleClick = () => {
        console.log('create playlist button clicked');
        window.location.replace('http://localhost:5000/login');
    }

    render() {
        return (
            <div className="image-page-header row">
                <h2>Select Image</h2>
                <p>Which image are you most drawn to in the present moment... click!</p>
                <p>For more options click on shuffle below. Or if feeling inspired, choose upload to select your own image.</p>
            </div>
        );
    }
}


export default ImageSelect;