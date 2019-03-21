import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { withStyles, withTheme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 350,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


class DropDownMenu extends Component {
    state = {
        genre: '',
        name: 'hai',
        labelWidth: 0,
    };

    componentDidMount() {
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        
        const { classes } = this.props;

        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel 
                    ref={ref => {
                        this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-genre-simple"
                >
                    Genre
          </InputLabel>
                <Select
                    value={this.state.genre}
                    onChange={this.handleChange}
                    input={
                        <OutlinedInput
                            labelWidth={this.state.labelWidth}
                            name="genre"
                            id="outlined-age-simple"
                        />
                    }
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>

                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            // <ValidatorForm
            //     ref="form"
            //     // onSubmit={this.handleSubmit}
            //     onError={errors => console.log(errors)}
            // >
            // <TextValidator
            //     id="tag"
            //     select
            //     fullWidth
            //     label="Select a genre"
            //     className={classes.textField}
            //     value={this.state.genre}
            //     onChange={this.handleChange}
            //     SelectProps={{
            //         MenuProps: {
            //             className: classes.menu,
            //         },
            //     }}
            //     // validators={['required']}
            //     // errorMessages={['this field is required']}
            //     margin="normal"
            //     variant="outlined"
            // >
            //     {/* {this.props.tags.map(option => (
            //         <MenuItem key={option.id} value={option.id}>
            //             {option.name}
            //         </MenuItem>
            //     ))} */}
            // </TextValidator>
            // </ValidatorForm>
        );
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}


export default withStyles(styles)(DropDownMenu);