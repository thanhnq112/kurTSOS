import { Paper } from "@material-ui/core";
import { useAudioSchema } from "context/AudioSchema";
import { useEffect } from "react";
const Visualizer = ({ playerState }) => {
  // const { analyser } = useAudioSchema();
  const { analyser, analyserAfterEffect } = useAudioSchema();
  useEffect(() => {
    let canvas = document.getElementById("audio_visual");
    let ctx = canvas.getContext("2d");
    canvas.style.width = "100%";
    canvas.width = canvas.offsetWidth;
    if (playerState === "running") {
      let data = new Uint8Array(analyser.frequencyBinCount);
      function draw(data) {
        data = [...data.slice(0, 180)];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let space = canvas.width / data.length;
        data.forEach((value, i) => {
          ctx.beginPath();
          // ctx.strokeStyle = "#3f51b5";
          ctx.strokeStyle = "#000000";
          ctx.moveTo(space * i, canvas.height);
          ctx.lineTo(space * i, canvas.height - value / 2);
          ctx.stroke();
        });
      }
      function loopingFunction() {
        requestAnimationFrame(loopingFunction);
        analyser.getByteFrequencyData(data);
        draw(data);
      }
      requestAnimationFrame(loopingFunction);
    } else {
      ctx.fillText("Dynamic Visuals", canvas.width / 2 - 50, 60);
    }
    // eslint-disable-next-line
  }, [playerState]);

  useEffect(() => {
    let canvas = document.getElementById("audio_visual2");
    let ctx = canvas.getContext("2d");
    canvas.style.width = "100%";
    canvas.width = canvas.offsetWidth;
    if (playerState === "running") {
      let data = new Uint8Array(analyserAfterEffect.frequencyBinCount);
      function draw(data) {
        data = [...data.slice(0, 180)];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let space = canvas.width / data.length;
        data.forEach((value, i) => {
          ctx.beginPath();
          // ctx.strokeStyle = "#3f51b5";
          ctx.strokeStyle = "#000000";
          ctx.moveTo(space * i, canvas.height);
          ctx.lineTo(space * i, canvas.height - value / 2);
          ctx.stroke();
        });
      }
      function loopingFunction() {
        requestAnimationFrame(loopingFunction);
        analyserAfterEffect.getByteFrequencyData(data);
        draw(data);
      }
      requestAnimationFrame(loopingFunction);
    } else {
      ctx.fillText("Dynamic Visuals affter effect", canvas.width / 2 - 75, 60);
    }
    // eslint-disable-next-line
  }, [playerState]);

  return (
    <Paper>
      <canvas id="audio_visual"/>
      <canvas id="audio_visual2"/>
    </Paper>
  );
};

export default Visualizer;
