import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledWhiteIcon from "@material-ui/icons/PauseCircleFilled";
import { SET_STATE_FROM_EPISODES } from "../../../actions/types";
import { useDispatch, useSelector } from "react-redux";
import PlaylistSelector from "../Playlist/PlaylistSelector";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  name: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "100%",
    flexShrink: 0,
  },
  duration_ms: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  playButton: {
    fontSize: "50px",
    width: "50px",
    float: "left",
    display: "block",
    "&:hover": {
      cursor: "pointer",
    },
  },
  playlistSelect: {
    width: "80%",
    marginBottom: "5px",
    float: "right",
  },
}));

const Episodes = ({ podcastEpisodes }) => {
  const [isLoading, setLoading] = useState(true);
  const [podcastDetails, setPodcastDetails] = useState([]);
  const [beenPlayed, setPlayed] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const playerState = useSelector((state) => state.player);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePlay = (episode) => {
    dispatch({
      type: SET_STATE_FROM_EPISODES,
      payload: {
        url: episode.audio_preview_url,
        playing: true,
        episode_id: episode.id,
        title: episode.name,
        image: episode.images[0].url,
        artist: podcastEpisodes.name,
        isVisible: true,
      },
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .post(`/api/user-history/${episode.id}`, {}, config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    const copy = beenPlayed;
    copy[`${episode.id}`] = true;
    setPlayed(copy);
  };

  const handlePause = () => {
    dispatch({
      type: SET_STATE_FROM_EPISODES,
      payload: {
        playing: false,
      },
    });
  };

  useEffect(() => {
    const myObj = {};
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    axios
      .get(`/api/spotify/shows/${podcastEpisodes.id}`, {}, config)
      .then((res) => {
        setPodcastDetails(res.data.episodes.items);
        res.data.episodes.items.forEach(function (element) {
          axios
            .get(`/api/user-history/${element.id}`, {}, config)
            .then(function (response) {
              myObj[`${element.id}`] = response.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .then(() => {
        setPlayed(myObj);
      });

    axios
      .get(`/api/spotify/shows/${podcastEpisodes.id}`, {}, config)
      .then((res) => {})
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Typography component={"div"}>Loading episodes...</Typography>;
  }

  return (
    <Typography component={"div"}>
      {podcastDetails.map((episode) => (
        <Accordion
          expanded={expanded === episode.id}
          key={episode.id}
          onChange={handleChange(episode.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <Typography component={"div"} className={classes.name}>
              {!beenPlayed[`${episode.id}`] ? (
                <RadioButtonCheckedIcon fontSize='small' />
              ) : (
                <RadioButtonUncheckedIcon fontSize='small' />
              )}
              {episode.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={3}>
              <Grid item xs={1}>
                {!playerState.playing ? (
                  <PlayCircleFilledWhiteIcon
                    onClick={() => {
                      handlePlay(episode);
                    }}
                    className={classes.playButton}
                  />
                ) : playerState.episode_id === episode.id ? (
                  <PauseCircleFilledWhiteIcon
                    onClick={handlePause}
                    className={classes.playButton}
                  />
                ) : (
                  <PlayCircleFilledWhiteIcon
                    onClick={() => {
                      handlePlay(episode);
                    }}
                    className={classes.playButton}
                  />
                )}
              </Grid>
              <Grid item xs={11}>
                <div className={classes.playlistSelect}>
                  <PlaylistSelector
                    episodeId={episode.id}
                    style={{ width: "30px" }}
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                {episode.description}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Typography>
  );
};

export default Episodes;
