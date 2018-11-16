import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';


const styles = theme => ({
  topBar: {
    position: 'fixed',
    top: 0,
    height: '3vw',
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  tabRoot: {
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'center',
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
      <div >
        <AppBar className={classes.topBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" >
              Media Findr
            </Typography>
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
                  to="/" />
                <Tab 
                  disableRipple
                  classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                  label="Videos" 
                  component={Link} 
                  to="/videos/" 
                />
              </Tabs>
          </Toolbar>
        </AppBar>           
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);

    