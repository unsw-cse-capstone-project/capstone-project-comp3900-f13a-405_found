import Dialog from "@material-ui/core/Dialog";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Episodes from "./Episodes";
import Typography from "@material-ui/core/Typography";
import SubscribeButton from "../SubscribeButton";
import Snackbar from '@material-ui/core/Snackbar';

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

export const DetailedView = ({
    selectedPod,
    open,
    handleClose,
    img
    }) => {

    const [openSnack, setSnackOpen] = React.useState(false);

    const HandleCopyURL = (selectedPod) => {
      // Should replace with a namespace variable but since the application is not being hosted this is okay.
      navigator.clipboard.writeText(`localhost:3000/dashboard/${selectedPod.id}`);
      setSnackOpen(true);
    }
  
    const handleSnackClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackOpen(false);
    };

    return (

          <Dialog
          handleClose={handleClose}
            aria-labelledby='customized-dialog-title'
            open={open}
          >
            <DialogTitle id='customized-dialog-title'>
              {selectedPod.name}
              <IconButton
          aria-label='close'
          onClick={handleClose}
          className={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>{selectedPod.description}</Typography>
              <SubscribeButton id={selectedPod.id} />
              <Button size='large' variant='contained' onClick={() => HandleCopyURL(selectedPod)}>Generate Share Podcast URL</Button>
              <img height='60px' width='60px' src={img} alt='podcastimage' />
              <Typography gutterBottom>
                <Episodes podcastName={selectedPod.name} podcastEpisodes={selectedPod} />
              </Typography>
              <Typography gutterBottom></Typography>
            </DialogContent>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={openSnack}
              autoHideDuration={6000}
              onClose={handleSnackClose}
              message="Podcast URL Copied to Clipboard"
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
          />
          </Dialog>
      );
};