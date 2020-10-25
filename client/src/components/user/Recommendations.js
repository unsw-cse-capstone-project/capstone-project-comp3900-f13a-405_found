import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      minHeight: "250px"
    },
    media: {
      height: 140,
    },
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingTop: "20px"
      }
  });

const Recommendations = () => {
    const [isLoading, setLoading] = useState(true);
    const [podcasts, setPodcasts] = useState([]);
    const classes = useStyles();

    const fetchPodcasts = async (term) => {
        setLoading(true);
        const res = await axios.get(`/api/spotify/search/${term}`);
        const array = res.data.shows.items;
        const shuffled = array.sort(function(){return .5 - Math.random()});
        setPodcasts(shuffled.slice(0,3));
        setLoading(false);
      };

      useEffect(() => {
        fetchPodcasts("a");
      }, []);



if (isLoading) {
    return <Typography>Loading episodes...</Typography>;
  }

  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
    {podcasts.map((podcast) => (
        <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image= {podcast.images[0].url}
                  title= {podcast.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="h2">
                  {podcast.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {/* {podcast.description} */}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
            </Grid>
    ))}
    <Grid container justify="flex-end">
    <Button  color='primary' size='medium' variant='contained' onClick ={fetchPodcasts.bind(this, "b")}>
   Refresh 
    </Button>
    </Grid>
   </Grid>
   
    )};

export default Recommendations;