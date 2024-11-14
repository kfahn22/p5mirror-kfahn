// https://en.wikipedia.org/wiki/Treemapping
// http://www.cs.williams.edu/~jannen/teaching/f16/cs135/lectures/lecture.15.pdf

let data;

function preload() {
  data = loadJSON("showcases.json");
}

function setup() {
  createCanvas(1000, 1000);
  // data = {
  //   name: "root",
  //   children: [
  //     { name: "A", value: 100 },
  //     { name: "B", value: 100 },
  //     { name: "C", value: 100 },
  //     {
  //       name: "D",
  //       children: [
  //         { name: "D1", value: 50 },
  //         { name: "D2", value: 50 },
  //         { name: "D3", value: 100 },
  //         { name: "D4", value: 50 },
  //       ],
  //     },
  //   ],
  // };

  drawTreemap(data, 0, 0, width, height);
}

function drawTreemap(data, x, y, w, h) {
  if ("value" in data) {
    fill(random(100, 255), random(100, 255), random(100, 255));
    rect(x, y, w, h);
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(data.name, x + w / 2, y + h / 2);
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
