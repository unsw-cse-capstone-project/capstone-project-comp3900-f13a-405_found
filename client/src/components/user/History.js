import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: "95%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const History = () => {
  const [isLoading, setLoading] = useState(true);
  const [historyDetails, setHistory] = useState([]);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    axios.get("/api/user-history").then((res) => {
      console.log(res);
      setHistory(res.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Typography component={"div"}>Loading history...</Typography>;
  }

  return (
    <div className={classes.root}>
      {historyDetails.map((episode) => (
        <ListItem key={episode._id}>
          <ListItemText
            primary={`${episode.showName} - ${episode.episodeName}`}
          />
          <Divider />
        </ListItem>
      ))}
    </div>
  );
};

export default History;
