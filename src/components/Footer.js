import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
  // link: {
  //   color: 'white',
  //   textDecoration: 'none',
  // },
  bottomBar: {
    backgroundColor: '#3f51b5',
    height: '3vw',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  linkRoot: {
    color: '#c8ccd6',
    textAlign: 'center',
    '&:hover': {
      color: '#fff',
      opacity: 1,
    },
    '&:focus': {
      color: '#fff',
    },
  },
  linkSelected: {
    cursor: 'pointer',
    color: '#fff',
  },
});

class Footer extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div >
        <BottomNavigation className={classes.bottomBar}>
            <BottomNavigationAction
              classes={{ root: classes.linkRoot, selected: classes.linkSelected }}
              label="facebook" 
              icon={ <FontAwesomeIcon icon={['fab', 'facebook']} size='lg' />} 
              disableRipple
              component="a" href="https://www.facebook.com/pixabay" target="_blank"
            />
            <BottomNavigationAction 
              classes={{ root: classes.linkRoot, selected: classes.linkSelected }}
              label="twitter" 
              icon={ <FontAwesomeIcon icon={['fab', 'twitter']} size='lg'/>} 
              disableRipple
              component="a" href="https://twitter.com/pixabay" target="_blank"
            />
            <BottomNavigationAction 
              classes={{ root: classes.linkRoot, selected: classes.linkSelected }}
              label="instagram" 
              icon={<FontAwesomeIcon icon={['fab', 'instagram']} size='lg'/>} 
              disableRipple
              component="a" href="https://www.instagram.com/pixabay" target="_blank"
            />            
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
