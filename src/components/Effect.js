import { Switch, Typography } from "@material-ui/core";
import { useAudioSchema } from "context/AudioSchema";
import { useState } from "react";

const Effect = ({ title, node }) => {
  // const { audioContext } = useAudioSchema();
  const { listNodes, analyserAfterEffect } = useAudioSchema();
  const { gainNode } = listNodes;
  const [underEffect, setUnderEffect] = useState(false);
  const handleEffectChange = (event) => {
    if (event.target.checked) {
      node.connect(analyserAfterEffect);
      // if (!gainNode.disconnect(audioContext.destination))
      //   gainNode.disconnect(audioContext.destination);
      try {
        gainNode.disconnect(analyserAfterEffect);
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      node.disconnect(analyserAfterEffect);
      // if (!gainNode.connect(audioContext.destination))
      // gainNode.connect(audioContext.destination);
      try {
        gainNode.connect(analyserAfterEffect);
      }
      catch (error) {
        console.log(error);
      }
    }
    // if (event.target.checked) node.connect(audioContext.destination);
    // else node.disconnect(audioContext.destination);
    setUnderEffect(event.target.checked);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Switch
        // style={{
        //   // background: "#f95b29",
        //   color: "#f95b29"
        // }}
        color="primary"
        
        checked={underEffect}
        onChange={handleEffectChange}
      />
      <Typography
        variant="caption"
        color={underEffect ? "primary" : "textSecondary"}
      >
        {title}
      </Typography>
    </div>
  );
};

export default Effect;
