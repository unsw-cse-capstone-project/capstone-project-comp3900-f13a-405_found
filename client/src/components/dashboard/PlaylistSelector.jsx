import React ,{ useState, useEffect } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from "react-redux";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {
  getPlaylists,
  addToPlaylist
} from "../../actions/playlist";

const PlaylistSelector = (props) => {
  const playlistState = useSelector(state => state.playlist);
  const {playlists, isLoaded} = playlistState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylists());  
  },[]);

  const inPlaylist = (playlist, episodeId) => {
    //console.log(playlist);
    
  }

  const handleAddPlaylist = (playlistId, episodeId) => {
    dispatch(addToPlaylist(playlistId, episodeId));
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content">
        <Typography>Add To Playlist</Typography>
      </AccordionSummary>
      {
        isLoaded ?
          playlists.length > 0 ?
            playlists.map(playlist => {
              return (
                <AccordionDetails>
                  <Typography>{playlist.playlistName}</Typography>
                  {
                    // isLoaded ? (
                      playlist.playlistEpisodes.filter(episode => episode.id == props.episodeId).length == 1 ?
                        <RemoveCircleIcon style={{color: 'red', cursor: 'pointer'}}/>
                        : <AddCircleIcon onClick={() => handleAddPlaylist(playlist._id, props.episodeId)} style={{color: 'green', cursor: 'pointer'}}/>
                  }

                </AccordionDetails>
              )
            })
          : <Typography style={{padding: '16px'}}>You have no playlists!</Typography>
        : null
      }
    </Accordion>
  )
  
}

export default PlaylistSelector;
