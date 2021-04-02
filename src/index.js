import { listBand } from "constants/listBand";
import { AudioSchema } from "context/AudioSchema";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const WebContextAudio = window.AudioContext || window.webkitAudioContext;
const audioContext = new WebContextAudio();
const gainNode = new GainNode(audioContext);

const filterNodes = [];
for (let i = 0; i < 6; i++) {
  // if (i === 0) {
  //   const filterNode = new BiquadFilterNode(audioContext, {
  //     type: "lowpass",
  //   });
  //   filterNode.frequency.value = listBand[i].max;
  //   filterNodes.push(filterNode);
  // }
  // else if (i > 0) {
  //   const filterNode = new BiquadFilterNode(audioContext, {
  //     type: "bandpass",
  //   });
  //   filterNode.frequency.value = (listBand[i].min + listBand[i].max) / 2;
  //   filterNodes.push(filterNode);
  //   filterNodes[i - 1].connect(filterNode);
  // }
  // else {
  //   const filterNode = new BiquadFilterNode(audioContext, {
  //     type: "highpass",
  //   });
  //   filterNode.frequency.value = listBand[i].min;
  //   filterNodes.push(filterNode);
  //   filterNodes[i - 1].connect(filterNode);
  //   filterNode.connect(gainNode);
  // }

  const filterNode = new BiquadFilterNode(audioContext, {
    type: "peaking",
  });
  filterNode.frequency.value = (listBand[i].min + listBand[i].max) / 2;
  filterNodes.push(filterNode);
  if (i > 0) filterNodes[i - 1].connect(filterNode);
  if (i === 5) {
    filterNode.connect(gainNode);
  }

  // const filterNode = new BiquadFilterNode(audioContext, {
  //   type: "peaking",
  // });
  // filterNode.frequency.value = (listBand[i].min + listBand[i].max) / 2;
  // filterNodes.push(filterNode);
  // if (i > 0) filterNodes[i - 1].connect(filterNode);
  // if (i === 7) {
  //   filterNode.connect(gainNode);
  // }
}

//create delay node
const gainDelayNode = new GainNode(audioContext, { gain: 0.4 });
const afterDelayNode = new DelayNode(audioContext, { delayTime: 0.6 });
const afterFilterGainNode = new GainNode(audioContext);
const delayNode = new GainNode(audioContext);
gainDelayNode.connect(afterDelayNode);
afterDelayNode.connect(delayNode);
afterFilterGainNode.connect(delayNode);


//create vibrato node
// const vibratoNode = new GainNode(audioContext, { gain: 0 });




//create distortion node
function makeDistortionCurve(amount) {
  // let k = typeof amount === 'number' ? amount : 50,
  let k = amount,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
  for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      // curve[i] = (3 + k)*Math.atan(Math.sinh(x*0.25)*5) / (Math.PI + k * Math.abs(x));
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

const distortionGainNode = new GainNode(audioContext);
const distortionNode = new WaveShaperNode(audioContext, {
  curve: makeDistortionCurve(30),
  // curve: makeDistortionCurve(400),
  // oversample: '4x',
});
// distortionGainNode.connect(distortionNode);






// const shaperNode = new WaveShaperNode(audioContext, {
//   curve: new Float32Array([0, 1]),
// });

let analyser = audioContext.createAnalyser();
analyser.fftSize = 512;
let analyserAfterEffect = audioContext.createAnalyser();
analyserAfterEffect.fftSize = 512;

gainNode.connect(analyserAfterEffect);
analyserAfterEffect.connect(audioContext.destination);
// gainNode.connect(vibratoNode);
gainNode.connect(distortionGainNode);
gainNode.connect(afterFilterGainNode);
gainNode.connect(gainDelayNode);
// gainNode.connect(analyser);
audioContext.suspend();

ReactDOM.render(
  <React.StrictMode>
    <AudioSchema.Provider
      value={{
        audioContext,
        listNodes: {
          filterNodes,
          gainNode,
          delayNode,
          // vibratoNode,
          distortionGainNode,
          // shaperNode,
          distortionNode,
        },
        analyser,
        analyserAfterEffect,
      }}
    >
      <App />
    </AudioSchema.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
