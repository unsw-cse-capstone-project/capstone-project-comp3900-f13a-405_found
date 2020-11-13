import {
  AppBar,
  Grid,
  InputBase,
  makeStyles,
  Toolbar,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";
import Podcasts from "../DetailedView/Podcasts";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffd180",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "1.7rem",
    width: "85vh",
    "&:hover": {},
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [podcastsPerPage] = useState(4);
  const { share_id } = useParams();

  const fetchPodcasts = async (term) => {
    setLoading(true);
    const res = await axios.get(`/api/spotify/search/${term}`);
    setPodcasts(res.data.shows.items);
    setLoading(false);
  };

  useEffect(() => {
    fetchPodcasts("a");
  }, []);

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      fetchPodcasts("a");
    } else {
      fetchPodcasts(e.target.value);
    }
  };

  // Get current podcasts
  const indexOfLastPodcast = currentPage * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts = podcasts.slice(
    indexOfFirstPodcast,
    indexOfLastPodcast
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Grid item>
            <InputBase
              placeholder='Search podcasts'
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize='large' />}
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>
      </Toolbar>
      <Grid>
        <div className='container mt-5'>
          <Podcasts
            style={{
              zIndex: -1,
            }}
            podcasts={currentPodcasts}
            loading={loading}
            share_id={share_id}
          />
          <Pagination
            className={theme.pag}
            podcastsPerPage={podcastsPerPage}
            totalPodcasts={podcasts.length}
            paginate={paginate}
          />
        </div>
      </Grid>
    </AppBar>
  );
}
