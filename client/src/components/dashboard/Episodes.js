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
import PlaylistSelector from "./PlaylistSelector";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Player from "../player/player"; 
import { displayAlert } from "../../actions/alert";

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
  const [beenPlayed, setPlayed] = useState({});
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const playerState = useSelector((state) => state.player);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  

  const handlePlay = async (episode) => {
    console.log("playing from episode.js");

    try {
      const config = {
        withCredentials: true,
      }
      const res = await axios.get(`/api/latest-episode/${episode.id}`, config);
      const seconds_played = res.data.seconds;
      console.log("seconds played from Episodes.js: " + seconds_played);
    } catch (err) {
      displayAlert("An error occurred handlePlay() at Episodes.js");
    }


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

    axios
      .post(`/api/user-history/${episode.id}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // .then(() => {
    //   axios.get(`api/user-history/${episode.id}`)
    //   .then(function (response) {
    //   console.log(response.data.Viewed);
    // })
    // });
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
    axios
      .get(`/api/spotify/shows/${podcastEpisodes.id}`)
      .then((res) => {
        setPodcastDetails(res.data.episodes.items);
        res.data.episodes.items.forEach(function (element) {
          axios
            .get(`api/user-history/${element.id}`)
            .then(function (response) {
              console.log(response.data.Viewed);
              myObj[`${element.id}`] = response.data.Viewed;
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
      .get(`/api/spotify/shows/${podcastEpisodes.id}`)
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
              {/* {console.log(beenPlayed)} */}
              {episode.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={"div"}>
              {!playerState.playing ? (
                <PlayCircleFilledWhiteIcon
                  onClick={() => {
                    handlePlay(episode);
                    //Player.handlePlay;
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
                    //Player.handlePlay;
                  }}
                  className={classes.playButton}
                />
              )}
              <div style={{ width: "50%", marginBottom: "5px" }}>
                <PlaylistSelector
                  episodeId={episode.id}
                  style={{ width: "30px" }}
                />
              </div>
              {episode.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Typography>
  );
};

export default Episodes;
