import { useState } from "react";
import { Slider, makeStyles, Typography } from "@material-ui/core/";

const Panel = ({ frequency, filter }) => {
  const classes = useStyles();
  const [volume, setVolume] = useState(0);
  const handleSlide = (event, newValue) => {
    setVolume(newValue);
    filter.gain.value = newValue;
  };
  const valueFrequency = (frequency) => {
    if (frequency > 1000) return Math.round(frequency / 1000) + "kHz";
    else return frequency + "Hz";
  };

  const setDefaultValue = () => {
    setVolume(0);
    filter.gain.value = 0;
  }

  return (
    <div className={classes.panel}>
      <Typography align="center" color="textSecondary" variant="caption">
        {valueFrequency(frequency)}
      </Typography>
      <Slider
        className={classes.slider}
        orientation="vertical"
        min={-50}
        max={50}
        step={1}
        value={volume}
        onChange={handleSlide}
      />
      <Typography align="center" variant="caption" onDoubleClick={setDefaultValue}>
        {volume + "dB"}
      </Typography>
    </div>
  );
};
const useStyles = makeStyles({
  panel: {
    height: "15em",
    width: "3em",
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    alignItems: "center",
  },
});
export default Panel;
