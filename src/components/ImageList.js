import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import GridList  from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import ZoomIn from '@material-ui/icons/ZoomIn';
import GetApp from '@material-ui/icons/GetApp';
import Favorite from '@material-ui/icons/Favorite';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#f7f8fa',
    padding: '1em',
  },
  iconMargin: {
    marginRight: `${theme.spacing.unit * 0.02}em`,
  },
});

class ImageList extends Component {
  state = {
    open: false,
    currentImg: '',
    currentImgPageUrl: '',
    currentImgDownloads: '',
    currentImgFavorites: ''
  }
  
  handleOpen = (img) => {
    this.setState({ 
      open: true, 
      currentImg: img.largeImageURL,
      currentImgPageUrl: img.pageURL,
      currentImgDownloads: img.downloads,
      currentImgFavorites: img.favorites
    });
  };

  handleClose = () => {
    this.setState({ 
      open: false 
    });
  };


  render() {
    let imageListContent;
    const { classes, images } = this.props;


    if(images) {
      imageListContent = (
        <div className={classes.container}>
          <GridList cols={3}>
            {images.map(img => (
              <GridListTile key={img.id} >
                <img src={img.largeImageURL} alt="img-url" />
                <GridListTileBar
                  title={
                    <span>
                      Tags: {img.tags}
                    </span>
                  }
                  subtitle={
                    <span>
                      by: <strong>{img.user}</strong>
                    </span>              
                  }
                  actionIcon={
                    <IconButton onClick={() => this.handleOpen(img)}>
                      <ZoomIn color="secondary" />
                    </IconButton>
                  }       
              />
              </GridListTile>
            ))}
          </GridList>
        </div>
      )
    } else {
      imageListContent = null;
    }

    return (
      <div>
        {imageListContent}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="image-dialog-title">{this.state.currentImgPageUrl}:</DialogTitle>
          <DialogContent>
            <IconButton aria-label="favorites">
              <Favorite className={classes.iconMargin} />
              <Typography variant="subtitle2">
                <NumberFormat value={this.state.currentImgFavorites} thousandSeparator={true} displayType={'text'} />
              </Typography>
            </IconButton>
            <IconButton aria-label="downloads">
              <GetApp className={classes.iconMargin} />
              <Typography variant="subtitle2">
                <NumberFormat value={this.state.currentImgDownloads} thousandSeparator={true} displayType={'text'} />
              </Typography>
            </IconButton>
            <img src={this.state.currentImg} alt="" style={{width: '100%'}} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }
}

ImageList.propTypes = {
  images: PropTypes.array.isRequired
}

export default withStyles(styles)(ImageList);