
// This doesn't work
//import * as SPLAT from "https://cdn.jsdelivr.net/npm/gsplat@latest";
import { SPLAT } from "https://cdn.jsdelivr.net/npm/gsplat@latest";
let controls;


async function preload() {
  const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";
  
   // await SPLAT.Loader.LoadAsync(url, scene, (progress) => progressIndicator.value = progress * 100);
   //  progressDialog.close();
}

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  
  const progressDialog = document.getElementById("progress-dialog");
const progressIndicator = document.getElementById("progress-indicator");

  splat = new SPLAT();
const renderer = new splat.WebGLRenderer(canvas);
const scene = new splat.Scene();
const camera = new splat.Camera();
controls = new splat.OrbitControls(camera, canvas);

  //handleResize();
}
// const canvas = document.getElementById("canvas");

function draw() {
 
        controls.update();
        renderer.render(scene, camera);

        //requestAnimationFrame(frame);


  

   //requestAnimationFrame(frame);
}


// function handleResize {
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     };