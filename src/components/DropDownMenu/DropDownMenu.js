import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { withStyles, withTheme } from '@material-ui/core/styles';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';




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
        genre: '',
    };

  
    handleChange = event => {
        this.setState({ genre: event.target.value });
    };

    handleSubmit = () => {
        this.props.dispatch({ type: 'SET_SELECTED_GENRE', payload: this.state.genre });
        this.setState({
            genre: '',
        });
        this.props.history.push("playlist-gen");
    }


    render() {
        
        const { classes } = this.props;

        return (
            


        //     <FormControl variant="outlined" className={classes.formControl}>
        //         <InputLabel 
        //             ref={ref => {
        //                 this.InputLabelRef = ref;
        //             }}
        //             htmlFor="outlined-genre-simple"
        //         >
        //             Genre
        //   </InputLabel>
        //         <Select
        //             value={this.state.genre}
        //             onChange={this.handleChange}
        //             input={
        //                 <OutlinedInput
        //                     labelWidth={this.state.labelWidth}
        //                     name="genre"
        //                     id="outlined-age-simple"
        //                 />
        //             }
        //         >
        //             <MenuItem value="">
        //                 <em>select...</em>
        //             </MenuItem>
        //             {this.displayGenreItems()}

        //             {/* <MenuItem value={10}>Ten</MenuItem>
        //             <MenuItem value={20}>Twenty</MenuItem>
        //             <MenuItem value={30}>Thirty</MenuItem> */}
        //         </Select>


        //     </FormControl>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
            <TextValidator
                className="drop-down-menu"
                id="tag"
                select
                fullWidth
                label="Select a genre"
                className={classes.textField}
                value={this.state.genre}
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