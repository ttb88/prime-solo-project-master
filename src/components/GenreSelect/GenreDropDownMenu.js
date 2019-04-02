import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import '../NavBar/NavBar.css';


class DropDownMenu extends Component {
    state = {
       genre_id: '',
    };

    handleChange = event => {
        console.log(event.target.value);
        this.setState({ 
            genre_id: event.target.value,
        });
    };

    handleSubmit = async() => {       
        await this.props.dispatch({ type: 'SET_GENRE', payload: this.state.genre_id })
        await this.setState({
            genre_id: '',
        });
        this.props.history.push("/energy");
    }

    render() {

        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
            <TextValidator
                className="drop-down-menu"
                id="tag"
                select
                multiple
                fullWidth
                label="Select a genre"
                value={this.state.genre_id}
                onChange={this.handleChange}
                validators={['required']}
                errorMessages={['this field is required']}
                margin="normal"
                variant="outlined"
            >
                {this.props.genres.map(genre => (
                    <MenuItem key={genre.id} value={genre.id}>
                        {genre.genre_name}
                    </MenuItem>
                ))}
            </TextValidator>
                <button type="submit" className="next-button">next</button>
            </ValidatorForm>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default (connect(mapReduxStateToProps)(DropDownMenu));