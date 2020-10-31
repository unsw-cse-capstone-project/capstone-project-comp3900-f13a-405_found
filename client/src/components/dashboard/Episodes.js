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
import { SET_STATE_FROM_EPISODES } from "../../actions/types";
import { useDispatch, useSelector } from "react-redux";

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
    display: "block",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Episodes = ({ podcastEpisodes }) => {
  const [isLoading, setLoading] = useState(true);
  const [podcastDetails, setPodcastDetails] = useState([]);
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
      },
    });
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
    axios.get(`/api/spotify/shows/${podcastEpisodes.id}`).then((res) => {
      setPodcastDetails(res.data.episodes.items);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Typography>Loading episodes...</Typography>;
  }

  return (
    <Typography>
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
            <Typography className={classes.name}>{episode.name}</Typography>
            <Typography className={classes.duration_ms}>
              {/* {episode.duration_ms} */}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {!playerState.playing ? (
                <PlayCircleFilledWhiteIcon
                  onClick={() => {
                    handlePlay(episode);
                  }}
                  className={classes.playButton}
                />
              ) : playerState.episode_id == episode.id ? (
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
              {episode.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Typography>
  );
};

export default Episodes;
