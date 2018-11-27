import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import GridList  from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import GetApp from '@material-ui/icons/GetApp';
import Favorite from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#f7f8fa',
    padding: '1em',
  },
  playIcon: {
    backgroundColor: '#f50057',
    color: '#fff',
    borderRadius: '50%',
    padding: '0.4em',
  },
  cover: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  dialogBar: {
    justifyContent: 'space-between',
  },
  iconMargin: {
    marginRight: `${theme.spacing.unit * 0.02}em`,
  },
});

class VideoList extends Component {
  state = {
    open: false,
    currentVid: '',
    currentVidPageUrl: '',
    currentVidDownloads: '',
    currentVidFavorites: ''
  }
  
  handleOpen = (vid) => {
    this.setState({ 
      open: true, 
      currentVid: vid.videos.small.url,
      currentVidPageUrl: vid.pageURL,
      currentVidDownloads: vid.downloads,
      currentVidFavorites: vid.favorites
    });
  };

  handleClose = () => {
    this.setState({ 
      open: false 
    });
  };

  render() {
    let videoListContent;
    const { classes, videos } = this.props;

    if(videos) {
      videoListContent = (
        <div className={classes.container}>
          <GridList cols={3}>
            {videos.map(vid => (
              <GridListTile key={vid.id} >
                <video 
                  className={classes.cover}
                  poster={`https://i.vimeocdn.com/video/${vid.picture_id}`} 
                >
                </video>

                <GridListTileBar
                  title={
                    <span>
                      <strong>{vid.user}</strong>
                    </span>
                  }
                  subtitle={
                    <span>
                      Tags: {vid.tags}
                    </span>              
                  }
                  actionIcon={
                    <IconButton onClick={() => this.handleOpen(vid)}>
                      <PlayArrowIcon color="secondary" className={classes.playIcon} />
                    </IconButton>
                  }       
              />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )
    } else {
      videoListContent = null;
    }

    return (
      <div>
        {videoListContent}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
         <DialogTitle id="image-dialog-title">{this.state.currentVidPageUrl}</DialogTitle>
          <DialogContent>
            <video 
                className={classes.cover}
                src ={this.state.currentVid} 
                preload="auto"
                controls
              >
            </video>
          </DialogContent>
          <DialogActions className={classes.dialogBar}>     
            <div className={classes.dialogBarLeft}>
              <IconButton aria-label="favorites">
                <Favorite className={classes.iconMargin} />
                <Typography variant="subtitle2">
                  <NumberFormat value={this.state.currentVidFavorites} thousandSeparator={true} displayType={'text'} />
                </Typography>
              </IconButton>
              <IconButton aria-label="downloads">
                <GetApp className={classes.iconMargin} />
                <Typography variant="subtitle2">
                  <NumberFormat value={this.state.currentVidDownloads} thousandSeparator={true} displayType={'text'} />
                </Typography>
              </IconButton>
            </div>
            <Button variant="contained" color="secondary" onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

VideoList.propTypes = {
  videos: PropTypes.array.isRequired
}

export default withStyles(styles)(VideoList);