let data;
let graphics = [];
let popup = null;
let palette = [
  [11, 106, 136], // teal
  [45, 197, 244], // aqua
  [112, 50, 126], // dk purple
  [146, 83, 161], // purple
  [164, 41, 99], // red-purple
  [236, 1, 90], // raspberry
  [240, 99, 164], // pink
  [241, 97, 100], // pink-orange
  [248, 158, 79], // orange
  [102, 211, 52], // green
  [252, 238, 33], // yellow
  [112, 22, 22], // maroon
];
//let interpolatedColors = [];

function preload() {
  data = loadJSON("showcases.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Calculate the interpolated colors for all combinations
//   for (let i = 0; i < palette.length; i++) {
//     for (let j = 2; j < 8; j++) {
//       let percent = j / 10;
//       let c = palette[i];

//       let newColor = lerpColor(color(255, 255, 255), color(c), percent);
//       interpolatedColors.push(newColor);
//     }
//   }
 
  drawTreemap(data, 0, 0, width, height);
}

function draw() {
  background(255);
  for (let g of graphics) {
    image(g.buffer, g.x, g.y, g.w, g.h);
  }

  if (popup && popup.x < width * 0.75) {
    fill(255);
    stroke(0);
    rect(popup.x, popup.y, popup.w, popup.h);
    fill(0);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    text(popup.text, popup.x + 5, popup.y + 5);
  } else {
    if (popup && popup.x > width * 0.75) {
      fill(255);
      stroke(0);
      rect(popup.x - 200, popup.y, popup.w, popup.h);
      fill(0);
      noStroke();
      textSize(12);
      textAlign(LEFT, TOP);
      text(popup.text, popup.x - 200 + 5, popup.y);
    }
  }
}
function drawTreemap(data, x, y, w, h) {
  if ("value" in data) {
    let buffer = createGraphics(w, h);
    buffer.fill(random(palette));
    buffer.rect(0, 0, w, h);
    buffer.fill(0);
    buffer.textSize(12);
    buffer.textAlign(CENTER, CENTER);
    if (w > 150 && h > 20) {
      buffer.text(data.name, w / 2, h / 2);
    }
    graphics.push({
      buffer: buffer,
      x: x,
      y: y,
      w: w,
      h: h,
      name: data.name,
      value: data.value,
    });
    return;
  }

  let totalValue = data.children.reduce((sum, d) => sum + getValue(d), 0);
  if (totalValue === 0) return; // Prevent division by zero

  let currentX = x;
  let currentY = y;

  for (let child of data.children) {
    let ratio = getValue(child) / totalValue;
    if (w > h) {
      let childWidth = ratio * w;
      drawTreemap(child, currentX, currentY, childWidth, h);
      currentX += childWidth;
    } else {
      let childHeight = ratio * h;
      drawTreemap(child, currentX, currentY, w, childHeight);
      currentY += childHeight;
    }
  }
}

function getValue(node) {
  if ("value" in node) {
    return node.value;
  } else if ("children" in node) {
    return node.children.reduce((sum, d) => sum + getValue(d), 0);
  }
  return 0;
}

function mouseMoved() {
  let found = false;
  for (let g of graphics) {
    if (
      mouseX > g.x &&
      mouseX < g.x + g.w &&
      mouseY > g.y &&
      mouseY < g.y + g.h
    ) {
      popup = {
        x: mouseX + 10,
        y: mouseY + 10,
        w: 250,
        h: 50,
        //text: `Name: ${g.name}\nValue: ${g.value}`,
        text: `${g.name}\n${g.value} showcases`,
      };
      found = true;
      break;
    }
  }
  if (!found) {
    popup = null;
  }
}
