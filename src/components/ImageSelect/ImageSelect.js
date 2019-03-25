import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageItem from '../ImageItem/ImageItem';
import './ImageSelect.css';




class ImageSelect extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_IMAGES'});
        this.props.dispatch({type: 'FETCH_USER'});
    }

 
    displayImages = () => {
        console.log(this.props.images);
        const images = this.props.images;
        const shuffled = images.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 6);
        let number = 1
        return selected.map(image => <ImageItem history={this.props.history} image={image} number={number++} key={image.id}/>)
    }

    render() {

        
        
        
        return (
            <>
            <div className="select-page-header">
                <h2>Select Image</h2>
                <p>Which image are you most drawn to in the present moment... click!</p>
                <p>For more options click on shuffle below. Or if feeling inspired, choose upload to select your own image.</p>
            </div>
            <div className="images-grid-container">
                {this.displayImages()}
                    {/* <img src="images/a7fc3b296a575f9bcb1e9cf03f21feae.jpg" /> */}
            </div>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(ImageSelect));