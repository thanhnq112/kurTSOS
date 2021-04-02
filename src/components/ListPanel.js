import { makeStyles, Paper } from "@material-ui/core/";
import { listBand } from "constants/listBand";
import { useAudioSchema } from "context/AudioSchema";
import React from "react";
import Panel from "./Panel";
const ListPanel = () => {
  const classes = useStyles();
  const { listNodes } = useAudioSchema();
  const { filterNodes } = listNodes;
  return (
    <Paper className={classes.listPanel}>
      {listBand.map((band, index) => (
        <Panel key={index} frequency={band.max} filter={filterNodes[index]} />
      ))}
    </Paper>
  );
};
const useStyles = makeStyles({
  listPanel: {
    // width: "100%",
    display: "flex",
    gap: "1.5em",
    padding: "0.5em 1em",
  },
});
export default ListPanel;
