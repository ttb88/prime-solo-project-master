import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 300,
        maxWidth: 1000,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 6,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 12 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};


function getStyles(name, that) {
    return {
        fontWeight:
            that.state.genre_id.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class DropDownMenu extends React.Component {
    state = {
        genre_id: [],
    };

    handleSubmit = async () => {
        await this.props.dispatch({ type: 'SET_GENRE', payload: this.state.genre_id })
        await this.setState({
            genre_id: [],
        });
        this.props.history.push("/energy");
    }

    handleChange = event => {
        this.setState({ genre_id: event.target.value });
    };


    render() {
        const { classes } = this.props;
     console.log('genre', this.state.genre_id)

        return (
            <div className={classes.root}>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    
                <FormControl className={classes.formControl} onSubmit={this.handleSubmit}>
                    <InputLabel htmlFor="select-multiple-chip">Genres</InputLabel>
                    <Select     
                        multiple
                        value={this.state.genre_id}
                        onChange={this.handleChange}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {this.props.genres.map(genre => (
                            <MenuItem key={genre.id} value={genre.genre_name} style={getStyles(genre.genre_name, this)}>
                                {genre.genre_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                    <button type="submit" className="next-button">next</button>
                </ValidatorForm>  
            </div>
        );
    }
}

DropDownMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default withStyles(styles, { withTheme: true })(connect(mapReduxStateToProps)(DropDownMenu))

// export default withStyles(styles)(connect(mapReduxStateToProps)(DropDownMenu));