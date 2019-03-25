import React, { Component } from 'react';
import './HomePage.css'
// import Typography from '@material-ui/core/Typography';
// import { withStyles } from '@material-ui/core/styles';
// import NavBar from '../NavBar/NavBar';
// import '../ProjectPage/ProjectPage.css';
// import ProjectList from './ProjectList';

// const styles = {
//     root: {
//         flexGrow: 1,
//     },
//     grow: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginLeft: -12,
//         marginRight: 20,
//     },
//     typography: {
//         useNextVariants: true,
//     },
// };


class HomePage extends Component {
    handleClick = () => {
        console.log('create playlist button clicked');
        window.location.replace('http://localhost:5000/login');
    }

    render() {
        // const { classes } = this.props;

        return (
            <div className="center-contents">
            <div className="grid-center-container">
                <div className="grid-item-1">
                    <h1>stream</h1>   
            </div >
                <div className="grid-item-2">
                <button  onClick={this.handleClick}>create playlist</button>
                </div>


            </div>
            </div>
        );
    }
}


export default HomePage;