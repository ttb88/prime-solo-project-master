import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
// import './EnergySelect.css';


class MoodSelect extends Component {

    state = {
        slider: 50,

    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_GENRES' });
    }

    handleOnChange = event => {
        this.setState({
            slider: event.target.value,
        })
    }

    handleChange = async () => {
        await this.props.dispatch({ type: 'SET_MOOD', payload: this.state.slider/100 })
        await this.setState({
            slider: 50,
        });
        this.props.history.push("/image");
    }

    walkOpacity = () => {
        let currentOpacity = this.state.slider / 100
        return currentOpacity
    }

    sleepOpacity = () => {
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
                        <br />Select within the range what best suits your desired mood.</p>
                            </div>
                        </div>
                        <div className="grid-item-2">
                            <div class="slidecontainer">
                                <div className="icon"><i class="fas fa-meh-blank" style={{ opacity: `${this.sleepOpacity()}` }}></i></div>
                                <input onChange={this.handleOnChange} type="range" min="0" max="100" value={this.state.slider} class="slider" id="myRange" />
                                <div className="icon"><i class="fas fa-grin" style={{ opacity: `${this.walkOpacity()}` }}></i></div>
                            </div>
                            <button onClick={this.handleChange} className="next-button">next</button>
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