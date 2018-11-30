import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  background: {
    backgroundColor: '#111',
    height: '75vh',
  },
  textContainer: {
    color: '#fff',
    display: 'flex',
    width: '90%',
    margin: '0 auto',
    justifyContent: 'space-evenly',
  },
  text: {
    fontFamily: 'Lato',
    fontSize: '5em',
    textShadow: '0 0 0.1em #fff, 0 0 0.2em #fff, 0 0 0.3em #fff, 0 0 0.4em #f7f,0 0 0.6em #f0f, 0 0 0.8em #f0f, 0 0 1.0em #f0f, 0 0 1.2em #f0f',
    color: '#fff',
  }
});

class HomePage extends Component {
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.background}>          
        <div className={classes.textContainer}>    
          <Fade in={true} timeout={2000} >
            <h2 className={classes.text}>Stunning</h2>
          </Fade>
          <Fade in={true} timeout={4000} >
            <h2 className={classes.text}>Free</h2>
          </Fade>
          <Fade in={true} timeout={6000} >
            <h2 className={classes.text}>Images</h2>
          </Fade>
          <Fade in={true} timeout={8000} >
            <h2 className={classes.text}>and</h2>
          </Fade>
          <Fade in={true} timeout={10000} >
            <h2 className={classes.text}>Videos</h2>
          </Fade>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(HomePage);

