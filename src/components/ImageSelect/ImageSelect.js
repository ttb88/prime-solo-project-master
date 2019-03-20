import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageSelect.css';


class ImageSelect extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_IMAGES'})
    }


    render() {
        return (
            <>
            <div className="image-page-header">
                <h2>Select Image</h2>
                <p>Which image are you most drawn to in the present moment... click!</p>
                <p>For more options click on shuffle below. Or if feeling inspired, choose upload to select your own image.</p>
            </div>
            <div className="images-container">


            </div>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(ImageSelect));