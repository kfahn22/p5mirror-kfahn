// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/150-runway-rainbows.html
// https://youtu.be/vEetoBuHj8g
// https://editor.p5js.org/codingtrain/sketches/K6l0JbS6u

// This sketch requires RunwayML to function
// For more see: https://runwayml.com
// https://youtu.be/ARnf4ilr9Hcc
// https://youtu.be/7btNir5L8Jc

let sunset;

function setup() {
  createCanvas(400, 400);
  createButton('sunset').mousePressed(generateSunset);
}

function generateSunset() {
  const z = [];
  for (let i = 0; i < 512; i++) {
    z[i] = random(-1, 1);
  }
  const inputs = {
  "z": z,
  "truncation": 0.8
};

fetch('http://localhost:8000/query', {
  method: 'POST',
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(inputs)
})
  .then(response => response.json())
  .then(outputs => {
    const { image } = outputs;
    // use the outputs in your project
  })
  
}

// function generateRainbow() {
//   // httpPost(path, [datatype], [data], [callback], [errorCallback])
//   const z = [];
//   for (let i = 0; i < 512; i++) {
//     z[i] = random(-1, 1);
//   }
//   const path = "http://localhost:8000/data";
//   const data = {
//     z: z,
//     truncation: 0.8
//   };
//   httpPost(path, 'json', data, gotImage, gotError);
// }

function gotError(error) {
  console.error(error);
}

function gotImage(result) {
  sunset = createImg(result.image);
  sunset.hide();
}


function draw() {
  background(220);
  if (sunset) {
    image(sunset, 0, 0);
  }
}