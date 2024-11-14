class PersianRug {
  constructor(i, j, shift, res, grid, size, rows, ncol, pg) {
    this.i = i;
    this.j = j;
    this.shift = shift;
    this.res = res;
    this.grid = grid;
    // this.i = this.x / this.res;
    // this.j = this.y / this.res;
    this.size = size; // current size
    this.rows = rows;
    this.ncol = ncol;
    this.pg = pg;
    this.mid = floor(this.size / 2);
    //this.corners = [];
    this.keys = [];
  }

  // getCorners() {
  //   this.corners = [
  //     createVector(this.x, this.y),
  //     createVector(this.x + (this.rows - 1) * this.res, this.y),
  //     createVector(this.x, this.y + (this.rows - 1) * this.res),
  //     createVector(
  //       this.x + (this.rows - 1) * this.res,
  //       this.y + (this.rows - 1) * this.res
  //     ),
  //   ];
  // }
  // getCorners() {

  //     grid[this.i][ this.j]
  //     createVector(this.i + (this.size - 1) * this.res, this.j),
  //     createVector(this.i, this.j + (this.size - 1) * this.res),
  //     createVector(
  //       this.i + (this.size - 1) * this.res,
  //       this.j + (this.size - 1) * this.res
  //     ),
  //   ];
  // }

  getHexColorByKey(key, palette) {
    return palette.colors[key] || null;
  }

  // getKeyByHexColor(hexColor, palette) {
  //   for (let key in palette.colors) {
  //     if (palette.colors[key].toLowerCase() === hexColor.toLowerCase()) {
  //       return key;
  //     }
  //   }
  //   return null;
  // }

  // componentToHex(c) {
  //   let hex = c.toString(16);
  //   return hex.length == 1 ? "0" + hex : hex;
  // }

  // newColor(n1, n2, n3, n4, shift) {
  //   let a = 1;
  //   let b = 1;
  //   let c = 1;
  //   let d = 1;
  //   let e = 1;
  //   return (a * n1 + b * n2 + c * n3 + d * n4 + e * shift) % this.ncol;
  // }

  newColor(n1, n2, n3, n4, shift) {
    return (n1 + n2 + n3 + n4 + shift) % this.ncol;
  }

  rgbToHex(r, g, b) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }

  calculateColor() {
    // Grab the keys from the four corners of the square and find new key
    let newKey = this.newColor(
      this.grid[this.i][this.j],
      this.grid[this.i + this.size - 1][this.j],
      this.grid[this.i][this.j + this.size - 1],
      this.grid[this.i + this.size - 1][this.j + this.size - 1],
      this.shift
    );
    console.log(newKey)

    // Assign new key to the middle row and column in the square
    let start = this.i + 1;
    let n = this.i + this.rows - 1;
    let l = this.j + this.mid;
    for (let k = start; k < n; k++) {
      this.grid[k][l] = newKey;
    }
    start = this.j + 1;
    let k = this.i + this.mid;
    n = this.j + this.rows - 1;
    for (let l = start; l < n; l++) {
      this.grid[k][l] = newKey;
    }
  }

  fillSquare(i, j) {
    this.pg.noStroke();
    let x = i * resolution;
    let y = j * resolution;
    let key = this.grid[i][j];
    if (key !== null) {
      this.pg.fill(this.getHexColorByKey(key, palette));
      this.pg.rect(x, y, this.res, this.res);
    }
  }

  show() {
    for (let i = 0; i < this.rows - 1; i++) {
      for (let j = 0; j < this.rows - 1; j++) {
        let x = i * this.res;
        let y = j * this.res;
        this.fillSquare(x, y, i, j);
      }
    }
  }
}
