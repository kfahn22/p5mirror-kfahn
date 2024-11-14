let sw = 11.2
let x = sw/2;
let y = sw/2;
let v;

let paths = [];
let slider;

const colors = {
  purple: "#70327E",
  sky: "#30C5F3",
  pink: "#EF63A4",
  orange: "#F89E4F",
};

// dim of logo [235, 185]
function setup() {
  createCanvas(400, 400);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  noFill();

  slider = createSlider(0, 1, 0, 0.01);
  slider.style("width", "400px");

  v = createVector;

  // PATHS
  let back = new LinearPath(
    [
      v(x+13, y+66),
      v(x+13, y+25),
      v(x, 25),
      v(x, y), 
      v(x+108, y),
      v(x+108, y+46),
    ],
    {
      stroke: colors.purple,
    }
  );
  let chimney = new LinearPath(
    [v(x+139, y+46), v(x+131, y), v(x+182, y), v(x+175, y+46)],
    { stroke: colors.sky }
  );

  let front = new LinearPath(
    [v(x+223, y+154), v(x+199, y+125), v(x+215, y+83), v(x+199, y+46)],
    { stroke: colors.pink }
  );

  let backwheel = new CirclePath(v(x+50, y+123), 53, { stroke: colors.purple });

  let frontwheel1 = new CirclePath(v(x+131, y+158), 18, {
    stroke: colors.sky,
    strokeWeight: 11.2,
  });
  let frontwheel2 = new CirclePath(v(x+182, y+158), 18, {
    stroke: colors.sky,
    strokeWeight: 11.2,
  });

  let opt = { stroke: colors.orange };
  let lines = [
    new LinearPath([v(x+177, y+66), v(x+177, y+101)], opt),
    new LinearPath([v(x+157, y+66), v(x+157, y+101)], opt),
    new LinearPath([v(x+137, y+66), v(x+137, y+101)], opt),
    new LinearPath([v(x+182, y+124), v(x+131, y+124)], opt),
  ];

  paths.push(
    back,
    chimney,
    front,
    backwheel,
    frontwheel1,
    frontwheel2,
    ...lines
  );
}

function draw() {
  background(255);
  translate(90-sw,112-sw);
//   if (frameCount === 1) {
//     saveGif("mySketch", 100, { units: "frames" });
//   }

  let t;

  if (frameCount < 100) {
    t = easeInOutCubic(frameCount / 100);
    slider.value(t);
  } else {
    t = slider.value();
  }

  paths.forEach((p) => p.draw(t));
}

// from https://easings.net/#easeInOutCubic
// cubic interpolation function
// function easeInOutCubic(x) {
//   x = constrain(x, 0, 1);
//   return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
// }

function easeInOutCubic(x) {
  x = constrain(x, 0, 1);
  return x < 0.5 ? 10 * pow(x, 4)  : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
