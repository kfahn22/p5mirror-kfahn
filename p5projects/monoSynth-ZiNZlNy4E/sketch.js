// https://noobnotes.net/shout-tears-for-fears/

let monoSynth;
let notes = [
  "E6",
  "D6",
  "C6",
  "B5",
  "A5",
  "G5",
  "F5",
  "E5",
  "D5",
  "C5",
  "B4",
  "A4",
  "G4",
  "F4",
  "E4",
  "D4",
  "C4",
  "B4",
  "B3",
  "A3",
  "G3",
  "F3",
];

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(playSynth);
  background(220);
  textAlign(CENTER);
  text('tap to play', width/2, height/2);

  monoSynth = new p5.MonoSynth();
}

function playSynth() {
  userStartAudio();

  //let note = random(['Fb4', 'G4']);
  //let note = random(notes);
  
  let note = 'F3';
  
  // note velocity (volume, from 0 to 1)
  let velocity = random();
  // time from now (in seconds)
  let time = 0;
  // note duration (in seconds)
  let dur = 1/6;

  monoSynth.play(note, velocity, time, dur);
}