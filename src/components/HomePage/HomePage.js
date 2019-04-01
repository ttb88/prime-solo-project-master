import React, { Component } from 'react';
import './HomePage.css'
// import NavBar from '../NavBar/NavBar';
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
        window.location.replace('https://prime-solo-project-stream.herokuapp.com/spotify-auth/login');
    }

    render() {
        // const { classes } = this.props;

        return (
            <>
                {/* <NavBar /> */}
                <div className="center-contents">
                    <div className="grid-center-container">
                        <div className="grid-item-1">
                            <h1><i class="material-icons stream-icon">graphic_eq</i>stream</h1>
                        </div >
                        <div className="grid-item-2">
                            <button className="complete-button" onClick={this.handleClick}><i class="material-icons">graphic_eq</i>create playlist</button>
                        </div>


                    </div>
                </div>
            </>
        );
    }
}


export default HomePage;