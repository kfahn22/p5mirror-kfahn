let defaultColor = [255, 0, 0];
let colors = [
  [255, 255, 0],
  [0, 185, 63],
  [0, 104, 255],
  [122, 0, 229],
];

class Sandpile {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.sandpiles = new Array(width)
      .fill()
      .map(() => new Array(height).fill(0));
    this.nextpiles = new Array(width)
      .fill()
      .map(() => new Array(height).fill(0));
    this.sandpiles[Math.floor(width / 2)][Math.floor(height / 2)] = 1000000000;
    // this.pg = createGraphics(width, height);
    // this.pg.pixelDensity(1);
  }

  topple() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.nextpiles[x][y] = this.sandpiles[x][y];
      }
    }

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let num = this.sandpiles[x][y];
        if (num >= 4) {
          this.nextpiles[x][y] -= 4;
          if (x + 1 < this.width) this.nextpiles[x + 1][y]++;
          if (x - 1 >= 0) this.nextpiles[x - 1][y]++;
          if (y + 1 < this.height) this.nextpiles[x][y + 1]++;
          if (y - 1 >= 0) this.nextpiles[x][y - 1]++;
        }
      }
    }

    let tmp = this.sandpiles;
    this.sandpiles = this.nextpiles;
    this.nextpiles = tmp;
  }

  render(buffer) {
    buffer.loadPixels();
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let num = this.sandpiles[x][y];
        let col = defaultColor;
        if (num === 0) {
          col = colors[0];
        } else if (num === 1) {
          col = colors[1];
        } else if (num === 2) {
          col = colors[2];
        } else if (num === 3) {
          col = colors[3];
        }

        let pix = (x + y * this.width) * 4;
        buffer.pixels[pix] = col[0];
        buffer.pixels[pix + 1] = col[1];
        buffer.pixels[pix + 2] = col[2];
        buffer.pixels[pix + 3] = 255;
      }
    }
    buffer.updatePixels();
  }
//   renderWithTiming() {
//     let startTime = millis();
//     this.render();
//     let endTime = millis();
//     console.log(`Render time: ${endTime - startTime} ms`);
//   }
}

let pg;
let sandpile;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  pg = createGraphics(width, height);
  sandpile = new Sandpile(width, height);

  background(defaultColor[0], defaultColor[1], defaultColor[2]);
}

function draw() {
  pg.clear();
  sandpile.render(pg);
  image(pg, 0, 0);

  for (let i = 0; i < 50; i++) {
    sandpile.topple();
  }
  
}
