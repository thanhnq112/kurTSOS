import { Fab, makeStyles, Tooltip } from "@material-ui/core/";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import { useAudioSchema } from "context/AudioSchema";
const Control = (props) => {
  const classes = useStyles();
  const { audioContext, listNodes, analyser } = useAudioSchema();
  const {
    file,
    sourceNode,
    setSourceNode,
    playerState,
    setPlayerState,
  } = props;
  // const { shaperNode, vibratoNode, filterNodes } = listNodes;
  const { distortionGainNode, distortionNode, filterNodes } = listNodes;

  const handlePlayerState = async () => {
    if (playerState === "running") {
      audioContext.suspend();
      setPlayerState("pause");
    } else if (playerState === "pause") {
      audioContext.resume();
      setPlayerState("running");
    } else {
      const bufferSourceNode = new AudioBufferSourceNode(audioContext);
      // const oscillatorNode = new OscillatorNode(audioContext, {
      //   type: "sine",
      //   frequency: 15,
      // });

      // const oscillatorGainNode = new GainNode(audioContext, { gain: 1 });
      // setSourceNode({ bufferSourceNode, oscillatorNode });
      setSourceNode({ bufferSourceNode });
      // oscillatorNode.connect(shaperNode).connect(vibratoNode.gain);
      
      // oscillatorNode.connect(oscillatorGainNode);
      // oscillatorGainNode.connect(distortionGainNode);
      distortionGainNode.connect(distortionNode);

      bufferSourceNode.connect(analyser);
      bufferSourceNode.connect(filterNodes[0]);
      bufferSourceNode.onended = () => {
        setPlayerState("suspended");
      };

      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const audioBuffer = await audioContext.decodeAudioData(e.target.result);
        bufferSourceNode.buffer = audioBuffer;
        // oscillatorNode.start();
        bufferSourceNode.start();
        audioContext.resume();
        setPlayerState("running");
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const handleStop = () => {
    // sourceNode.oscillatorNode.stop();
    sourceNode.bufferSourceNode.stop();
    setPlayerState("suspended");
  };

  return (
    <div className={classes.btns}>
      <Tooltip title={playerState === "running" ? "Pause" : "Play"}>
        <Fab
          size="small"
          color="primary"
          aria-label="play"
          disabled={file === null}
          onClick={() => handlePlayerState()}
        >
          {playerState === "running" ? <PauseIcon /> : <PlayArrowIcon />}
        </Fab>
      </Tooltip>
      <Tooltip title="Stop playing">
        <Fab
          size="small"
          color="secondary"
          aria-label="stop"
          disabled={file === null}
          onClick={handleStop}
        >
          <StopIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};
const useStyles = makeStyles({
  btns: {
    display: "flex",
    gap: "0.5em",
  },
});

export default Control;
