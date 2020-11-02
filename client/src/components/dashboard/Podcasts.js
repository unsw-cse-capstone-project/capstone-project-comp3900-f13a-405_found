import React, { useState, useEffect } from "react";
import SubscribeButton from "../SubscribeButton";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Episodes from "./Episodes";
import { DetailedView } from "./DetailedView"

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
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

const Podcasts = ({ podcasts, loading, share_id }) => {
  const [open, setOpen] = useState(false);
  const [podcast, setPodcast] = useState({});
  const [img, setImg] = useState();

  const handleClickOpen = (pod) => {
    setPodcast(pod);
    setImg(pod.images[0].url);
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
    // Clear local storage so the user is not redirected to the setPodcast
    localStorage.setItem('share_set', false);
    
  };

  const fetchPodcast = async (id) => {
    try {
      const res = await axios.get(`/api/spotify/shows/${id}`);
      if (res.status == 200) {
        handleClickOpen(res.data);
      } 
    } catch(err) {
      console.log('Invalid share-id. No podcasts exist with that id'); 
    }
  }

  useEffect(() => {
    if (share_id) {
      // If there is a share_id, fetch for the current podcast and set it
      fetchPodcast(share_id);
    }
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }  

  return (
    <ul className='list-group mb-4'>
      {podcasts.map((podcasts) => (
        <li
          onClick={handleClickOpen.bind(this, podcasts)}
          key={podcasts.id}
          className='list-group-item'
        >
          <div style={{ textAlign: "left", color: "black" }}>
            {podcasts.name}
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

      <DetailedView
      open = {open}
      handleClose = {handleClose}
      selectedPod = {podcast}
      img = {img}>
      
      </DetailedView>
    </ul>
  );
};

export default Podcasts;
