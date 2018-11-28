import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import ImageList from './ImageList';
import VideoList from './VideoList';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const API_KEY = process.env.REACT_APP_API_KEY; 
const API_URL_IMG = 'https://pixabay.com/api';
const API_URL_VID = 'https://pixabay.com/api/videos/';

const styles = theme => ({
  container: {
    display: 'flex',
    backgroundImage: 'url("https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg")',
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky',
    minHeight: '20vh',
    zIndex: 1,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    padding: '0em 0.5em',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F5F5F5',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  searchButton: {
    margin: theme.spacing.unit,
    flexShrink: 1,
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    padding: '1em',
    transition: theme.transitions.create('width'),
    },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }, 
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SearchBar extends Component {
  state = {
    isLoading: false,
    error: null,
    mediaType: 'images',
    amount: 15, 
    searchText: '',
    images: [],
    videos: []
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.setState({
      isLoading: true,
    });

    if(this.state.mediaType === 'images') {
      fetch(`${API_URL_IMG}/?key=${API_KEY}&q=${this.state.searchText}&image_type=all&per_page=${this.state.amount}&safesearch=true`)
        .then(res => {
          if(res.ok) {
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        })
        .then(data => this.setState({ 
          images: data.hits,
          isLoading: false,
          searchText: '',
        }))
        .catch(error => this.setState({
          error,
          isLoading: false
        }));
    } 
    else if(this.state.mediaType === 'videos') {
      fetch(`${API_URL_VID}/?key=${API_KEY}&q=${this.state.searchText}&video_type=all&per_page=${this.state.amount}&safesearch=true`)
        .then(res => {
          if(res.ok) {
            return res.json();
          } else {
            throw new Error(res.statusText);
          }
        })
        .then(data => this.setState({ 
          videos: data.hits,
          isLoading: false,
          searchText: '',
        }))
        .catch(error => this.setState({
          error,
          isLoading: false
        }));
      } 
  };
    
  render() {    
    const { classes } = this.props;

    if(this.state.isLoading) {
      return <h1>Loading...</h1>
    }
    
    if(this.state.error) {
      return <h1>{this.state.error.message}</h1>
    }

    return (
      <div>
        <div className={classes.container}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <SearchIcon className={classes.searchIcon}/>
            <InputBase
              type='text'
              name='searchText'
              value={this.state.searchText}
              onChange={this.handleChange}
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />

            <FormControl className={classes.formControl}>
              <Select
                type='text'
                name="mediaType"
                value={this.state.mediaType}
                onChange={this.handleChange}
                displayEmpty
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={"images"}>Images</MenuItem>
                <MenuItem value={"videos"}>Videos</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="amount-simple">Items</InputLabel>
              <Select
                type='number'
                name='amount'
                value={this.state.amount}
                onChange={this.handleChange}
                inputProps={{
                  name: 'amount',
                  id: 'amount-simple',
                }}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={500}>All</MenuItem>    
              </Select>
            </FormControl>
            <Button 
              className={classes.searchButton} 
              variant="contained" 
              type="submit" 
              value="Submit"
              color="primary" 
              onClick={this.handleSubmit} >
                Search
            </Button>
          </form>
        </div>

        {/* display ImageList component if array is not empty */}
        {this.state.mediaType === 'images' && this.state.images.length > 0 ? (<ImageList images={this.state.images} />) : null}
        
        
        {/* display VideoList component if array is not empty */}
        {this.state.mediaType === 'videos' && this.state.videos.length > 0 ? (<VideoList videos={this.state.videos} />) : null}

      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);