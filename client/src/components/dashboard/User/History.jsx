import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
    <Grid
      container
      style={{ height: "95%", overflowY: "scroll", width: "98%" }}
    >
      <Grid style={{}} item xs={12}>
        <ul className="list-group mb-4">
          {historyDetails.map((episode) => (
            <li key={episode._id} className="list-group-item">
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
