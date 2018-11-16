import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ImageList from './ImageList';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
const API_KEY = process.env.REACT_APP_API_KEY; 
const API_URL = 'https://pixabay.com/api';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    flexGrow: 5,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: `${theme.spacing.unit * 0.35}em`,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: `${theme.spacing.unit * 0.4}em`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '5em',
      '&:focus': {
        width: '7em',
      },
    },
  }
});

class SearchBar extends Component {
  state = {
    isLoading: false,
    error: null,
    amount: 15, 
    searchText: '',
    images: [],
    // videos: []
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    fetch(`${API_URL}/?key=${API_KEY}&image_type=photo&editors_choice=true&safesearch=true`)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong...");
        }
      })
      .then(data => this.setState({ 
        images: data.hits,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }

  // function to link image result amount value to searchText state and make GET request to API 
  onTextChange = (event) => {
    const val = event.target.value 
    this.setState({ [event.target.name] : val}, () => {
    // clear images when backspace searchText
      if(val === '') {
        this.setState({
          images: [],
          // videos: [],

        })
      } else {
        this.setState({
          isLoading: true
        });

        fetch(`${API_URL}/?key=${API_KEY}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
          .then(res => {
            if(res.ok) {
              return res.json();
            } else {
              throw new Error("Something went wrong...");
            }
          })
          .then(data => this.setState({ 
            images: data.hits,
            isLoading: false
          }))
          .catch(error => this.setState({
            error,
            isLoading: false
          }));
        }
      });
  };
  
  render() {
    // console.log(this.state);
    // console.log(this.state.images)
    const { classes } = this.props;

    if(this.state.error) {
      return <h1>{this.state.error.message}</h1>
    }

    if(this.state.isLoading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className={classes.root}>
        {/* <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" >
              Img Findr
            </Typography>
            <div className={classes.grow}></div> */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                name="searchText" 
                placeholder="Search…"
                value={this.state.searchText}
                onChange={this.onTextChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow}></div>
            <FormControl>
              <Select
                value={this.state.amount}
                onChange={this.onTextChange}
                input={<Input name="amount" id="image-count" />}
                autoWidth={true}
              >
                <MenuItem value="" disabled>Placeholder</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={45}>45</MenuItem>
                <MenuItem value={500}>All</MenuItem>    
              </Select>
              <FormHelperText>Photos To Display</FormHelperText>
            </FormControl>
          {/* </Toolbar>
        </AppBar> */}

        {/* display ImageList component if array is not empty */}
        {this.state.images.length > 0 ? (<ImageList images={this.state.images} />) : null}

      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);