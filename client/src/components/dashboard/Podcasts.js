import React, { useState } from "react";
import SubscribeButton from "../SubscribeButton";


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const Podcasts = ({ podcasts, loading }) => {

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [podcast, setPodcast] = useState({});

  const handleClickOpen = (term) => {
    setPodcast(term);
    setOpen(!open);

  };
  const handleClose = () => {
    setOpen(!open);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  } 

//onItemClick.bind(this, podcasts.id)

  return (
    <ul  className='list-group mb-4'>
      {podcasts.map((podcasts) => (
        
        <li onClick={handleClickOpen.bind(this, podcasts)} key={podcasts.id} className='list-group-item'>
          <div style={{ textAlign: "left", color: "black" }}>
            {podcasts.name}{" "}
          </div>
          <div style={{ textAlign: "right", color: "black" }}>
            <img
              height='60px'
              width='60px'
              src={podcasts.images[0].url}
              alt='podcastimage'
            />
            
          </div>
        </li>
      ))}

       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
        <DialogTitle id="customized-dialog-title"onClose={handleClose} >
        {podcast.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
          <SubscribeButton id={podcast.id} />
          </Typography>
        </DialogContent>
       
      </Dialog>
    </ul>
  );
};

export default Podcasts;
