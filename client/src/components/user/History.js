import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  name: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
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
      //setHistory(res.data.episodes.items);
      //setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Typography component={"div"}>Loading history...</Typography>;
  }

  return (
    <Typography component={"div"}>
      {historyDetails.map((episode) => (
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
              {episode.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={"div"}>{episode.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Typography>
  );
};

export default History;
