import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
// import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import VideoList from './components/VideoList';
import Footer from './components/Footer';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'

library.add(faFacebook, faTwitter, faInstagram)

const API_KEY = process.env.REACT_APP_API_KEY; 
const Urls = [
  `https://pixabay.com/api/?key=${API_KEY}`,
  `https://pixabay.com/api/videos/?key=${API_KEY}`
];


class App extends Component {

  state = {
    isLoading: false,
    error: null,
    amount: 15, 
    searchText: '',
    images: [],
    videos: []
  }

  // HELPER FUNCTIONS

  checkStatus = (res) => {
    if (res.ok) {
      return Promise.resolve(res);
    } else {
      return Promise.reject(new Error(res.statusText));
    }
  }

  parseJSON = (res) => {
    return res.json();
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    Promise.all(Urls.map(url =>
      fetch(url)
        .then(this.checkStatus)                 
        .then(this.parseJSON)
        .catch(error => this.setState({
          isLoading: false,
          error,
        }))
    ))
    .then(data => this.setState({
      isLoading: false,
      images: data[0].hits,
      videos: data[1].hits,
    }))
  }


  // componentDidMount() {
  //   this.setState({
  //     isLoading: true
  //   });

  //   fetch(`${API_URL}/?key=${API_KEY}&image_type=photo&editors_choice=true&safesearch=true`)
  //     .then(res => {
  //       if(res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error("Something went wrong...");
  //       }
  //     })
  //     .then(imageData => this.setState({ 
  //       images: imageData.hits,
  //       isLoading: false
  //     }))
  //     .catch(error => this.setState({
  //       error,
  //       isLoading: false
  //     }));
  // }


  //   fetchVideos = () => {
  //     fetch(`${API_URL}/?key=${API_KEY}&video_type=all&editors_choice=true&safesearch=true`)
  //     .then(res => {
  //       if(res.ok) {
  //         return res.json();
  //       } else {
  //         throw new Error("Something went wrong...");
  //       }
  //     })
  //     .then(videoData => this.setState({ 
  //       videos: videoData.hits,
  //       isLoading: false
  //     }))
  //     .catch(error => this.setState({
  //       error,
  //       isLoading: false
  //     }));
  //   }


  render() {
    // console.log('state:' + this.state)
    // console.log('state.images:' + this.state.images)
    // console.log('state.videos:' + this.state.videos)
    if(this.state.isLoading) {
      return <h1>Loading...</h1>
    }
    
    if(this.state.error) {
      return <h1>{this.state.error.message}</h1>
    }

    return (
      <div>
        <Router> 
          <div>
            <NavBar/>
            <Route 
              exact
              path='/' 
              render={ () => <ImageList images={this.state.images} /> } 
            />

            <Route 
              path='/videos/' 
              render={ () => <VideoList videos={this.state.videos} /> }
            />
          </div>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
