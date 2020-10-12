import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Grid, InputBase, IconButton, makeStyles } from '@material-ui/core'
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import Posts from './Posts';
import Pagination from './Pagination';


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff'
        //width: "100vh"
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '1.7rem',
        width: "85vh",
        '&:hover': {
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    },
    pag: {
        color: "black",
    }
}));

export default function Header() {

    const classes = useStyles();

    const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`/api/spotify/search/a`);
      setPosts(res.data.shows.items);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`/api/spotify/search/${e.target.value}`);
      var size = Object.keys(res.data.shows.items).length;

      console.log(size)
      
      setPosts(res.data.shows.items);
      setLoading(false);
    };

    fetchPosts();
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center">
                    <Grid item>
                        <InputBase
                            placeholder="Search podcasts"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="large" />}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <AccountCircleIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
                
            </Toolbar>
            <Grid><div className='container mt-5'>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
         className={classes.pag}
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div></Grid>
        </AppBar>
        
        
    )
}
