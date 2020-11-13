import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

import LinearProgress from "@material-ui/core/LinearProgress";
import { DetailedView } from "../DetailedView/DetailedView";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "250px",
  },
  media: {
    height: 140,
  },
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "20px",
  },
  titleFont: {
    fontSize: "32",
    fontWeight: "550",
  },
  gutter: {
    bottom: "0px",
    position: "absolute",
  },
  load: {
    width: "98%",
    paddingTop: "285px",
  },
});

const Recommendations = () => {
  const [isLoading, setLoading] = useState(true);
  const [podcasts, setPodcasts] = useState([]);
  const classes = useStyles();

  const [img, setImg] = useState();
  const [currPodcast, setCurrPodcast] = useState({});
  const [open, setOpen] = useState(false);

  const [currPodcasts, setCurrPodcasts] = useState([]);

  const shufflePods = () => {
    setLoading(true);
    const shuffled = currPodcasts.sort(function () {
      return 0.5 - Math.random();
    });
    setPodcasts(shuffled.slice(0, 3));
    setLoading(false);
  };

  const fetchPodcasts = async () => {
    const res = await axios.get(`/api/recommendations`);
    setCurrPodcasts(res.data.recs);
    const shuffled = res.data.recs.sort(function () {
      return 0.5 - Math.random();
    });
    setPodcasts(shuffled.slice(0, 3));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchPodcasts();
  }, []);

  const handleClickOpen = (pod) => {
    setCurrPodcast(pod);
    setImg(pod.images[0].url);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  if (isLoading) {
    return (
      <div className={classes.load}>
        <Typography>Generating your custom recommendedations...</Typography>
        <LinearProgress />
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      {podcasts.map((podcast) => (
        <Grid item xs={12} sm={6} md={4} key={podcast.id}>
          <Card className={classes.root}>
            <CardActionArea onClick={handleClickOpen.bind(this, podcast)}>
              <CardMedia
                className={classes.media}
                image={podcast.images[0].url}
                title={podcast.name}
              />
              <CardContent>
                <Typography classes={{ root: classes.titleFont }}>
                  {podcast.name.length > 46
                    ? podcast.name.substring(0, 46) + "..."
                    : podcast.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      <Grid container justify="flex-end">
        <Button
          color="primary"
          size="medium"
          variant="contained"
          onClick={() => shufflePods()}
        >
          Shuffle
        </Button>
      </Grid>

      <DetailedView
        open={open}
        handleClose={handleClose}
        selectedPod={currPodcast}
        img={img}
      ></DetailedView>
    </Grid>
  );
};

export default Recommendations;
