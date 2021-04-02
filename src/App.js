import { makeStyles, Paper } from "@material-ui/core/";
import Control from "components/Control";
import Effect from "components/Effect";
import FileLoader from "components/FileLoader";
import Visualizer from "components/Visualizer";
import Volume from "components/Volume";
import { useAudioSchema } from "context/AudioSchema";
import { useState } from "react";
import ListPanel from "./components/ListPanel";
function App() {
  const classes = useStyles();
  const { audioContext, listNodes } = useAudioSchema();
  // const { vibratoNode, delayNode } = listNodes;
  const { distortionNode, delayNode } = listNodes;
  const [file, setFile] = useState(null);
  const [sourceNode, setSourceNode] = useState({});
  const [playerState, setPlayerState] = useState(audioContext.state);
  return (
    <Paper elevation={3} className={classes.app}>
      <ListPanel />
      <div className={classes.control}>
        <Control
          file={file}
          sourceNode={sourceNode}
          setSourceNode={setSourceNode}
          playerState={playerState}
          setPlayerState={setPlayerState}
        />
        <Volume />
      </div>
      <div className={classes.control}>
        <FileLoader
          sourceNode={sourceNode}
          file={file}
          setFile={setFile}
          setPlayerState={setPlayerState}
        />
        <div className={classes.control}>
          {/* <Effect title="Vibrato" node={vibratoNode} /> */}
          <Effect title="Echo" node={delayNode} />
          <Effect title="Distortion" node={distortionNode} />
        </div>
      </div>
      <Visualizer playerState={playerState} />
    </Paper>
  );
}
const useStyles = makeStyles({
  app: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "1em",
    display: "flex",
    gap: "1em",
    flexDirection: "column",
  },
  control: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1em",
  },
});
export default App;
