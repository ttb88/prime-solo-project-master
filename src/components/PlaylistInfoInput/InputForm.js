import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';




const styles = theme => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    // formControl: {
    //     margin: theme.spacing.unit,
    //     minWidth: 350,
    // },
    // selectEmpty: {
    //     marginTop: theme.spacing.unit * 2,
    // },
    textField: {
        marginTop: 2,
        marginBottom: 10,
    },
    // menu: {
    //     width: 200,
    // },
});


class InputForm extends Component {
    state = {
        title: '',
        description: '',
    };

    handleChange = (property) => event => {
        console.log(event.target.value);
        this.setState({
            ...this.state,
            [property]: event.target.value
        });
    };

    handleSubmit = async () => {
        await this.props.dispatch({ type: 'SET_PLAYLIST_INFO', payload: this.state })
        await this.setState({
            title: '',
            description: '',
        });
        await this.props.dispatch({ type: 'POST_SELECTIONS', payload: this.props.itemSelections })

        this.props.history.push("/playlist-gen");
    }


    render() {
        const { classes } = this.props;

        return (

            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                        <TextValidator
                            id="playlist title"
                            label="* Playlist Title"
                            fullWidth
                            className={classNames(classes.textField)}
                            onChange={this.handleChange('title')}
                            name="playlist title"
                            type="text"
                            margin="normal"
                            value={this.state.title}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            variant="outlined"
                        />
                        <TextValidator
                            id="description"
                            label="Description"
                            fullWidth
                            className={classNames(classes.textField)}
                            onChange={this.handleChange('description')}
                            name="description"
                            type="text"
                            margin="normal"
                            value={this.state.description}
                            // validators={['required']}
                            // errorMessages={['this field is required']}
                            variant="outlined"
                        />
                <button type="submit" className="next-button">complete</button>
            </ValidatorForm>

        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default withStyles(styles)(connect(mapReduxStateToProps)(InputForm));