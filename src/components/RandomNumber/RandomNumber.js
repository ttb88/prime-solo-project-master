import React, { Component } from 'react';


class RandomNumber extends Component {

    componentDidMount() {
        let currentNumberArray = shuffle(array);
    }

    displayRandomNumber = () => {
        currentNumberArray.map(number => <RandomNumber number={number} />)
    }



    render() {
        return (

            <div className={`image-grid-item${this.displayRandomNumber}`}>
                <img src={this.props.image.image_path} alt={this.props.image.id} />
            </div>
        );
    }
}

export default RandomNumber;