let speech;

function setup() {
  background(0);
  speech = new p5.Speech(voiceReady);

  function voiceReady() {
    speech.setVoice('Bells');
  console.log(speech.voices);
}
  speech.started(startSpeaking);
  speech.ended(endSpeaking);
  
  speech.setVoice('Daniel');
  speech.speak('I knew you could do it.  You have brought glory to the company. I love you');
  speech.setVolume(0.05);
  
}

function startSpeaking() {
  background(0,255,0);
}

function endSpeaking() {
  background(0);
}

function draw() {
  //background(220);
}