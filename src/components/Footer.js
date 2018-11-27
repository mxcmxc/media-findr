import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'

library.add(faFacebook, faTwitter, faInstagram)
const styles = theme => ({
  bottomBar: {
    position: 'sticky',
    bottom: 0,
    minHeight: '2vh',
    backgroundColor: '#3f51b5',
    zIndex: 1,
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
    );
  }
}

export default withStyles(styles)(Footer);
