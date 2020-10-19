import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  makeStyles,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import Podcasts from "./Podcasts";
import Pagination from "./Pagination";

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
    //width: "100vh"
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
          <Grid item sm></Grid>
          <Grid item>
            <IconButton>
              <AccountCircleIcon fontSize='large' />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
      <Grid>
        <div className='container mt-5'>
          <Podcasts podcasts={currentPodcasts} loading={loading} />
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
