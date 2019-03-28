import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SavedPlaylists.css';

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




class PlaylistItem extends Component {

    handleImageClick = id => () => {
        // this.props.dispatch({ type: 'SET_IMAGE', payload: id })
        // this.props.history.push("/genre");
    }

    randomNumber = () => {
        return Math.floor(Math.random() * 1.6) + 1;
    }

    randomNumberTwo = () => {
        return Math.random() - .1;
    }


    render() {

        return (
            <div className={`playlist-reveal playlist-grid-item playlist-container`} style={{
                animationDelay: `${this.randomNumberTwo()}s`,
                animationName: this.props.animation, animationDuration: `${this.randomNumber()}s`
            }}>
           
                <div className="centered-text">Chill for the Summer</div>
        
           
           
                <img src={`images/small/${this.props.image.image_path}`} alt={this.props.image.id} onClick={this.handleImageClick(this.props.image.id)}  />
                <button className="playlist-go-button"><i class="material-icons">graphic_eq</i>REPLAY</button>
            </div>
          
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(PlaylistItem));