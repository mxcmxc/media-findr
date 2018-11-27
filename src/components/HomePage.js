import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  background: {
    backgroundImage: 'url("https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg")',
    backgroundSize: 'cover',
    height: '70vh',
  },
  textContainer: {
    color: '#fff',
    display: 'flex',
    width: '90%',
    margin: '0 auto',
    justifyContent: 'center',
    paddingTop: '3vh',
  },
  textMargin: {
    marginLeft: '5.5px',
  }
});

class HomePage extends Component {
  

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>    
        <div className={classes.textContainer}>    
          <Fade in={true} timeout={2000} >
            <h2 className={classes.textMargin}>Stunning</h2>
          </Fade>
          <Fade in={true} timeout={4000} >
            <h2 className={classes.textMargin}>Free</h2>
          </Fade>
          <Fade in={true} timeout={6000} >
            <h2 className={classes.textMargin}>Images and Videos</h2>
          </Fade>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(HomePage);

