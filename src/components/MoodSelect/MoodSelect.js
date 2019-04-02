import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';

class MoodSelect extends Component {

    state = {
        slider: 50,
    }

    handleOnChange = event => {
        this.setState({
            slider: event.target.value,
        })
    }

    handleClick = async () => {
        await this.props.dispatch({ type: 'SET_MOOD', payload: this.state.slider/100 })
        await this.setState({
            slider: 50,
        });
        this.props.history.push("/image");
    }

    moodUpOpacity = () => {
        let currentOpacity = this.state.slider / 100
        return currentOpacity
    }

    moodDownOpacity = () => {
        let currentOpacity = (this.state.slider / 100);
        let newOpacity = .5 + (.5 - currentOpacity)
        return newOpacity
    }


    render() {

        return (
            <>
                <NavBar />
                <div className="center-contents">
                    <div className="grid-center-container">
                        <div className="grid-item-1">
                            <div className="header-text">
                                <h2>Set the Mood</h2>
                                    <p>Feeling melancholy to reflective or craving a more hopeful state of mind?
                                    <br/>
                                    Select within the range what best suits your desired mood.
                                    </p>
                            </div>
                        </div>
                        <div className="grid-item-2">
                            <div className="slidecontainer">
                                <div className="icon"><i className="fas fa-meh-blank" style={{ opacity: `${this.moodDownOpacity()}` }}></i></div>
                                    <input onChange={this.handleOnChange} type="range" min="0" max="100" value={this.state.slider} className="slider" id="myRange" />
                                <div className="icon"><i className="fas fa-grin" style={{ opacity: `${this.moodUpOpacity()}` }}></i></div>
                            </div>
                                <button onClick={this.handleClick} className="next-button">next</button>
                        </div>
                    </div>
                </div>
                    <button onClick={() => this.props.history.push('/energy')} className="back-button button">back</button>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(MoodSelect));