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
        this.props.history.push('/image');  
    }

    render() {
        // const { classes } = this.props;

        return (

            <div className="bckgrnd-container">
                <div className="center-contents">
                    <h1>stream</h1>
                    <button onClick={this.handleClick}>create playlist</button>
                </div>
            </div>


        );
    }
}


export default HomePage;