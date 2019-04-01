import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import '../NavBar/NavBar.css';
import Input from '@material-ui/core/Input';




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
        marginBottom: 2,
    },
    // menu: {
    //     width: 200,
    // },
});


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
        const { classes } = this.props;
        console.log('genre id',this.state.genre_id)

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
                // className={classes.textField}
                value={this.state.genre_id}
                onChange={this.handleChange}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
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


export default withStyles(styles)(connect(mapReduxStateToProps)(DropDownMenu));