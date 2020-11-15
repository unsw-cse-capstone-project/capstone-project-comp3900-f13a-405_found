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
import SubscribeButton from "../../SubscribeButton";
import Snackbar from "@material-ui/core/Snackbar";
import { Grid } from "@material-ui/core";

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
      <Typography component={"div"} variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
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

export const DetailedView = ({ selectedPod, open, handleClose, img }) => {
  const [openSnack, setSnackOpen] = React.useState(false);

  const HandleCopyURL = (selectedPod) => {
    // Should replace with a namespace variable but since the application is not being hosted this is okay.
    navigator.clipboard.writeText(`localhost:3000/dashboard/share/${selectedPod.id}`);
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        {selectedPod.name}
        <IconButton
          style={{ position: "absolute", right: "0", top: "0" }}
          aria-label="close"
          onClick={handleClose}
          className={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3} style={{ paddingBottom: "10px" }}>
          <Grid item xs={8} style={{ fontSize: "16px" }}>
            {selectedPod.description}
          </Grid>
          <Grid item xs={3} style={{ padding: "10px" }}>
            <img height="160px" width="160px" src={img} alt="podcastimage" />
          </Grid>
          <Grid item xs={12}>
            <SubscribeButton id={selectedPod.id} />
            <Button
              size="large"
              variant="contained"
              onClick={() => HandleCopyURL(selectedPod)}
            >
              Generate Share Podcast URL
            </Button>
          </Grid>
        </Grid>
        <Typography component={"div"} gutterBottom>
          <Episodes
            podcastName={selectedPod.name}
            podcastEpisodes={selectedPod}
            style={{ paddingTop: "10px" }}
          />
        </Typography>
        <Typography component={"div"} gutterBottom></Typography>
      </DialogContent>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message="Podcast URL Copied to Clipboard"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Dialog>
  );
};
