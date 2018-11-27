import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import VideoList from './components/VideoList';
import Footer from './components/Footer';

const API_KEY = process.env.REACT_APP_API_KEY; 
const API_URL_IMG = 'https://pixabay.com/api';
const API_URL_VID = 'https://pixabay.com/api/videos/';

class App extends Component {

  state = {
    isLoading: false,
    error: null,
    mediaType: '',
    amount: 15, 
    images: [],
    videos: []
  }

  componentDidMount() {
    this.loadImages()
    this.loadVideos()
  }

  loadImages = () => {
    fetch(`${API_URL_IMG}?key=${API_KEY}&image_type=photo&editors_choice=true&safesearch=true`)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return new Error(res.statusText);
        }
      })
      .then(data => this.setState({ 
        images: data.hits,
        isLoading: false,
      }))
      .catch(error => this.setState({
        error,
        isLoading: false,
      }));
  }

  loadVideos = () => {
    fetch(`${API_URL_VID}?key=${API_KEY}&video_type=all&editors_choice=true&safesearch=true`)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return new Error(res.statusText);
        }
      })
      .then(data => this.setState({ 
        videos: data.hits,
        isLoading: false,
      }))
      .catch(error => this.setState({
        error,
        isLoading: false,
      }));
  }

  render() {

    return (
      <div>
        <NavBar/>
        <SearchBar />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route 
              path='/images' 
              render={ (props) => <ImageList images={this.state.images} />} />
            <Route 
              path='/videos' 
              render={ (props) => <VideoList videos={this.state.videos} />} />
            />
            <Route path='*' render={ () => <Redirect to='/' /> } /> 
          </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
