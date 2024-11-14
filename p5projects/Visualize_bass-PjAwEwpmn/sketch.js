let mic, fft;
// https://p5js.org/examples/sound-frequency-spectrum.html
let w;
let bss = [];
let sumBass = 0;
let avg, sigma, mn, mx;
let col;

function setup() {
  createCanvas(400, 400);
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  let col = color(0, 0 , 0);
  background(col);
  stroke(255);
  let spectrum = fft.analyze();

  
  
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }

  // let waveform = fft.waveform();
  // noFill();
  // beginShape();
  // stroke(20);
  // for (let i = 0; i < waveform.length; i++){
  //   let x = map(i, 0, waveform.length, 0, width);
  //   let y = map( waveform[i], -1, 1, 0, height);
  //   vertex(x,y);
  // }
  // endShape();
  let b = fft.getEnergy("bass");

  bss.push(b);

  beginShape();
  
  strokeWeight(1);
  for (let i = 0; i < bss.length; i++) {
     mx = max(bss);
    mn = min(bss);

    // Find avg and standard deviation
    // avg = findAverage(bss);
    // sigma = findStdDev(bss, avg);
   
    ///if (abs(bss[i] - avg) > sigma) {
    //  stroke(255, 0, 0);
      let x = map(i, 0, bss.length, 0, width);
      //let y = map(bss[i], 0, 255, 0, height);
      let y = map(bss[i], mn, mx, 0, height);
      vertex(x, y);
   // // } else {
   //    stroke(0, 0, 255);
   //    let x = map(i, 0, bss.length, 0, width);
   //    //let y = map(bss[i], 0, 255, 0, height);
   //    let y = map(bss[i], mn, mx, 0, height);
   //    vertex(x, y);
   // }
  }
  endShape();

  if (bss.length > width) {
    bss.splice(0, 1);
  }
  changeBackground(bss, mn, mx);
}

function findAverage(myArray) {
  let sum = 0;
  let average = 0;
  for (let i = 0; i < myArray.length; i++) {
    sum += myArray[i]; // add each element to the sum
    average = sum / myArray.length; // divide the sum by the number of elements
  }
  return average;
}

function findStdDev(myArray, avg) {
  let v = 0;
  let sigma = 0;
  for (let i = 0; i < myArray.length; i++) {
    let diff = myArray[i] - avg;
    v += sq(diff) / (myArray.length - 1);
    sigma = sqrt(v);
  }
  return sigma;
}

function changeBackground(myArray, mn, mx) {
  let d = (mx - mn);
  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] / d < 0.25) {
      background(255, 0, 255);
    }
  }
}
