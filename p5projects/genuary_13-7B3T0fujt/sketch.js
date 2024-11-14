var capturer = new CCapture({ format: 'png' , framerate: fps} );
var btn;
var counter = 1;
var vehicles = [];
var font;
let colorchoices = ["#FFBE0B", "#FB5607", "#FF006E", "#8338ec", "#3A86FF"];
var fps = 60;


function preload() {
  font = loadFont('Facile Sans.otf');
}

function setup() {
  frameRate(fps);
  createCanvas(800, 80);
  btn = document.createElement('button');
  btn.textContent = "save recording";
  document.body.appendChild(btn);
  btn.onclick = save_record;
  

   var points = font.textToPoints('I  am  losing  my  marbles!', 55, 60, 50, {
    sampleFactor: 0.25
  });
 
    
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y, random(colorchoices));
    vehicles.push(vehicle);
  }
  capturer.start();
}

var startMillis = 0;  // needed to subtract inital millis before first draw to begin at t=0;

function draw() {
  background(0);
  if (startMillis === 0) {
    startMillis = millis();
  }
  var duration = 3000;
  // compute how far we are through the animation as a value between o and 1;
  var elasped = millis() - startMillis;
  var t = map(elapsed, 0, duration, 0, 1);
  // if we have passed t=1 then end the animation
  if (t > 1) {
    noLoop();
    
    capturer.stop();
    capturer.save();
    return;
  }
  
   for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
   }
  //end drawing code
  // handle saving the frame
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));  

}

function save_record() {
  capturer.save();
}