import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

const History = () => {
  const [isLoading, setLoading] = useState(true);
  const [historyDetails, setHistory] = useState([]);

  useEffect(() => {
    axios.get("/api/user-history").then((res) => {
      setHistory(res.data.reverse());
      setLoading(false);
    });
  });

  if (isLoading) {
    return <Typography component={"div"}>Loading history...</Typography>;
  }

  return (
    <Grid container style={{ width: "98%" }}>
      <Grid style={{ height: "40vh", overflowY: "scroll" }} item xs={12}>
        <ul className='list-group mb-4'>
          {historyDetails.map((episode) => (
            <li key={episode._id} className='list-group-item'>
              <div style={{ textAlign: "left", color: "black" }}>
                <b>{episode.showName}</b>: {episode.episodeName}
              </div>
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default History;
