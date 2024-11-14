//https://codepen.io/ccajas/pen/gWLGvr
// https://editor.p5js.org/TimKim/sketches/vhD7JZxw9

c.width = 1024;
c.height = 768;

var ctx = c.getContext("2d");
var i = 0;
var steps = 17;
var colorRate = 8;

// Add the points for drawing the dragon

var dragon = function (x1, y1, x2, y2, step) 
{
  if (step--)
  {
    var dx = x2 - x1,
        dy = y2 - y1;

    var midX = x1 + (dx - dy) / 2,
        midY = y1 + (dx + dy) / 2;

    dragon(midX, midY, x1, y1, step);
    dragon(midX, midY, x2, y2, step);	

    // Switch up colors 
    var r = (i >> (colorRate - 3)) & 255;
    var g = (i >> (colorRate + 0)) & 255;
    var b = (i >> (colorRate - 1)) & 255;

    ctx.fillStyle = 'rgb('+ r +', '+ g +','+ b +')';

    // Points as small squares
    ctx.fillRect(midX, midY, 1.5, 1.5);
    i++;
  }
};

dragon( 
  c.width * 3/16,  c.height/3, /* start */ 
  c.width * 11/16, c.height/3, /* end */ 
  steps
);