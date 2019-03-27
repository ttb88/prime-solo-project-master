import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import './EnergySelect.css';


class EnergySelect extends Component {

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



    render() {

        return (
            <>
                <NavBar />
                <div className="center-contents">
                    <div className="grid-center-container">
                        <div className="grid-item-1">
                            <div className="header-text">
                                <h2>Energy Level</h2>
                            </div>
                        </div>
                        <div className="grid-item-2">
                            <div class="slidecontainer">
                                <div className="icon"><i class="fas fa-bed"></i></div>
                                <input onChange={this.handleOnChange} type="range" min="1" max="100" value={this.state.slider} class="slider" id="myRange" />
                                <div className="icon"><i class="fas fa-walking fa-lg"></i></div>
                            </div> 
                        </div>
                    </div>


                </div>
                <button onClick={() => this.props.history.push('/image')} className="back-button button">back</button>
            </>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default (connect(mapReduxStateToProps)(EnergySelect));