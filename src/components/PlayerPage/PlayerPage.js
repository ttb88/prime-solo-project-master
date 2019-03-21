import React, { Component } from 'react';


class HomePage extends Component {
    handleClick = () => {
        console.log('create playlist button clicked');
        window.location.replace('http://localhost:5000/login');
    }

    render() {

        return (
            <div className="center-contents">
                <h1>player page</h1>
            </div>
        );
    }
}


export default HomePage;