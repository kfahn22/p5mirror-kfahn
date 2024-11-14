// based on code by Daniel Shiffman


var polys = [];
var angle;
var delta;
let img;


let startTime;

function setup() {
  createCanvas(400, 400);
  captureFrame(saver);
  
  function captureFrame() {
     setInterval(saver, 50);
    // let fc = frameCount;
    // // set how often frames should be saved 
    // let m = millis();
    // if (m <= 100) {
    //   setInterval(saver, 50);
    // } else if (m > 100 && m <= 1000 ) {
    //   setInterval(saver, 100);
    // } else if (m > 1000 && m <= 5000) {
    //   setInterval(saver, 500);
    }
    function saver() {
      saveCanvas("threecolors.png"); 
      }

  // create polygons
  var inc = 100;
  for (var x = 0; x < width; x += inc) {
    for (var y = 0; y < height; y += inc) {
      var poly = new Polygon(4);
      poly.addVertex(x, y);
      poly.addVertex(x + inc, y);
      poly.addVertex(x + inc, y + inc);
      poly.addVertex(x, y + inc);
      poly.close();
      polys.push(poly);
    }
  }
}

function draw() {
  colorMode(RGB);
  
//  let from = color(2,103,193);
//   let to = color(255,132,132);
  
 
  //blue to pink
  //let from = color(160,108,213);
  let from = color(106,0,103);
  let to = color(57,67,183);
  
   let f = framecount;
   let m = millis();
    if (m <= 50) {
      background(lerpColor(from, to, 0.00));
      delta = 0;
      angle = 90;
      //saveFrames("threecolors", 'png', 1, 25); 
    } else if (m > 50 && m <= 100 ) {
      background(lerpColor(from, to, 0.1));
      angle = 85;
      delta = 5;
       //saveCanvas("threecolors.png"); 
    } else if (m > 100 && m <= 150) {
      background(lerpColor(from, to, 0.15));
      angle = 80;
      delta = 5;
      // saveFrames("threecolors", 'png', 1, 25); 
      // saveCanvas("threecolors.png"); 
    }
    else if (m > 150 && m <= 200) {
      background(lerpColor(from, to, 0.2));
      angle = 75;
     delta = 10;
     saveCanvas("threecolors.png"); 
    }
    else if (m > 200 && m <= 250) {
      background(lerpColor(from, to, 0.25));
      angle = 60;
     delta = 10;
      // saveCanvas("threecolors.png"); 
    }
    else if (m > 250 && m <= 300) {
      background(lerpColor(from, to, 0.3));
      angle = 55;
     delta = 10;
     //  saveCanvas("threecolors.png"); 
    }
    else if (m > 300 && m <= 350) {
      background(lerpColor(from, to, 0.35));
      
      angle = 50;
     delta = 10;
      //saveCanvas("threecolors.png"); 
    }
    else if (m > 350 && m <= 400) {
      background(lerpColor(from, to, 0.4));
     
      angle = 45;
     delta = 10;
      //saveCanvas("threecolors.png"); 
    }
   else if (m > 400 && m <= 450) {
      background(lerpColor(from, to, 0.45));
    
      angle = 50;
     delta = 15;
    // saveCanvas("threecolors.png"); 
    }
    else if (m > 450 && m <= 500) {
      background(lerpColor(from, to, 0.5));
     
      angle = 55;
     delta = 15;
     // saveCanvas("threecolors.png"); 
    }
    else if (m > 500 && m <= 550) {
      background(lerpColor(from, to, 0.45));
      
      angle = 60;
     delta = 15;
     // saveCanvas("threecolors.png"); 
    }
    else if (m > 550 && m <= 600) {
      background(lerpColor(from, to, 0.6));
     
      angle = 65;
     delta = 20;
   //   saveCanvas("threecolors.png"); 
    }
    else if (m > 600 && m <= 650) {
      background(lerpColor(from, to, 0.65));
     
      angle = 70;
     delta = 20;
    //  saveCanvas("threecolors.png"); 
    }
    else if (m > 650 && m <= 700) {
      background(lerpColor(from, to, 0.7));
     
      angle = 75;
     delta = 20;
     // saveCanvas("threecolors.png"); 
    }
   else if (m > 700 && m <= 750) {
      background(lerpColor(from, to, 0.75));
    
      angle = 80;
     delta = 25;
    // saveCanvas("threecolors.png"); 
    }
    else if (m > 850 && m <= 800) {
      background(lerpColor(from, to, 0.8));
     
      angle = 85;
     delta = 25;
    //  saveCanvas("threecolors.png"); 
    }
   else if (m > 850 && m <=900) {
      background(lerpColor(from, to, 1));
    
      angle = 90;
     delta = 25;
    // saveCanvas("threecolors.png"); 
    }
  
  console.log(angle, delta);
        for (var i = 0; i < polys.length; i++) {
          polys[i].hankin();
          polys[i].show();
    }
  //noLoop();

}

