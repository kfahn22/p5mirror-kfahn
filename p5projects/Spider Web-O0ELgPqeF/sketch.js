// Ported from Procatical Laboratory #14 in Creating Procedural Artworks with Processing: A Holistic Guide by Penny de Byl

let spiderWeb;


function setup() {
  createCanvas(800, 800);
  background(0);
  let spokeLength = 0.56* width;
  spiderWeb = new SpiderWeb(spokeLength);
   spiderWeb.setSpokeAngles();
}

function draw() {
  background(0);
  translate(width/2, height/2)
 
  spiderWeb.show();
}