import { Slider, Typography } from "@material-ui/core";
import VolumeUp from "@material-ui/icons/VolumeUp";
import { useAudioSchema } from "context/AudioSchema";
import { useState } from "react";

const Volume = () => {
  const { listNodes } = useAudioSchema();
  const { gainNode } = listNodes;
  const [volume, setVolume] = useState(1);
  const handleSliderChange = (event, newValue) => {
    setVolume(newValue);
    gainNode.gain.value = volume;
  };

  const setDefaultValueVolume = () => {
    setVolume(1);
    gainNode.gain.value = 1;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "1em",
        flex: 2,
        alignItems: "center",
        padding: "0.3em",
        borderRadius: "999px",
      }}
    >
      <VolumeUp onDoubleClick={setDefaultValueVolume}/>
      <Slider
        style={{ flex: 2 }}
        min={0}
        // max={1.98}
        max={2}
        step={0.02}
        value={volume}
        onChange={handleSliderChange}
      />
      <Typography variant="body2">{Math.round(50 * volume)}</Typography>
    </div>
  );
};

export default Volume;
