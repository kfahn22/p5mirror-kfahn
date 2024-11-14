class PersianRug {
  constructor(x, y, shift, res, grid, rows, ncol) {
    this.x = x;
    this.y = y;
    this.p = createVector(this.x, this.y);
    this.shift = shift;
    this.res = res;
    this.grid = grid;
    this.rows = rows;
    this.ncol = ncol;
    this.mid = floor(this.rows / 2);
    this.corners = [];
    this.keys = [];
  }
  
  
  // Function to return the four corners of the square (pixel)
  getCorners() {
    this.corners = [];
    this.corners.push(createVector(this.p.x, this.p.y)); // Top-left corner
    this.corners.push(
      createVector(this.p.x + (this.rows - 1) * this.res, this.p.y)
    ); // Top-right corner
    this.corners.push(
      createVector(this.p.x, this.p.y + (this.rows - 1) * this.res)
    ); // Bottom-left corner
    this.corners.push(
      createVector(
        this.p.x + (this.rows - 1) * this.res,
        this.p.y + (this.rows - 1) * this.res
      )
    ); // Bottom-right corner
  }

  // Function to return the number associated with a color
  getHexColorByKey(key, palette) {
    if (key in palette.colors) {
      return palette.colors[key];
    } else {
      return null; // or handle the case where the key doesn't exist
    }
  }

  getKeyByHexColor(hexColor, palette) {
    for (let key in palette.colors) {
      if (palette.colors[key].toLowerCase() === hexColor.toLowerCase()) {
        return key;
      }
    }
    return null; // Return null only after checking all keys
  }

  componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  // Function to calculate the new color
  newColor(n1, n2, n3, n4, shift) {
    return (n1 + n2 + n3 + n4 + shift) % this.ncol;
  }

  // Convert RGB to HEX
  rgbToHex(r, g, b) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }

  calculateColor() {
    this.keys = []; // Reset keys for each calculation
    for (let i = 0; i < this.corners.length; i++) {
      let c = get(this.corners[i].x, this.corners[i].y);
      let hexColor = this.rgbToHex(c[0], c[1], c[2]);
      let k = this.getKeyByHexColor(hexColor, palette);
      this.keys.push(k);
    }

    // Ensure keys array has valid numbers before calculating new color
    if (this.keys.length === 4) {
      let newKey = this.newColor(
        parseInt(this.keys[0]),
        parseInt(this.keys[1]),
        parseInt(this.keys[2]),
        parseInt(this.keys[3]),
        this.shift
      );
      //console.log(newKey);

      // Assign new color key to grid
      for (let i = 1; i < this.rows - 1; i++) {
        this.grid[i][this.mid] = newKey;
      }

      for (let j = 1; j < this.rows - 1; j++) {
        this.grid[this.mid][j] = newKey;
      }
    }
    
    console.log(this.grid)
  }

  fillSquare(x, y, i, j) {
    noStroke();
    let key = this.grid[i][j];
    if (key !== null) {
      this.newCol = this.getHexColorByKey(key, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    }
  }

  show() {
    for (let i = 1; i < this.rows - 1; i++) {
      let j = this.mid;
      let x = i * this.res;
      let y = j * this.res;
      this.fillSquare(x, y, i, j);
    }
    for (let j = 0; j < this.rows; j++) {
      let i = this.mid;
      let x = i * this.res;
      let y = j * this.res;
      this.fillSquare(x, y, i, j);
    }
  }
}
