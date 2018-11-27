import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const styles = theme => ({
  topBar: {
    position: 'sticky',
    top: 0,
    minHeight: '3vh',
    justifyContent: 'center',
    zIndex: 1,
  },
  logo: {
    fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
    fontWeight: 500,
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  grow: {
    flexGrow: 1,
  },
  tabRoot: {
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'center',
    textTransform: 'capitalize',
    '&:hover': {
      color: '#fff',
      opacity: 1,
    },
    '&:focus': {
      color: '#fff',
    },
  },
  tabSelected: {
    cursor: 'pointer',
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
  },
});

class NavBar extends Component {
  
  state = {
    value: 0, // false
  };


  handleChange = (event, value) => {
    this.setState({
      value
    });
  }
    
  render() {
    const { classes } = this.props;
    
    return (
        <AppBar className={classes.topBar}>
          <Toolbar>
            <Link to="/" className={classes.logo}>MEDIA FINDR</Link>
            <div className={classes.grow}></div>
              <Tabs 
                value={this.state.value} 
                onChange={this.handleChange}
                indicatorColor='secondary'                
              >
                <Tab 
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label="Images" 
                  component={Link} 
                  to="/images" />
                <Tab 
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label="Videos" 
                  component={Link} 
                  to="/videos" 
                />
              </Tabs>
          </Toolbar>
        </AppBar>           
    );
  }
}

export default withStyles(styles)(NavBar);
