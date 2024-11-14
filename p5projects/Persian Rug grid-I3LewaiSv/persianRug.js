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

  // Function to return the number assiciated with a color
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
  // See
  newColor(n1, n2, n3, n4, shift) {
    //console.log(this.ncol)
    return (n1 + n2 + n3 + n4 + shift) % this.ncol;
  }

  // The p5.js get() function returns RGB values
  // We are going to convert to a HEX code
  rgbToHex(r, g, b) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }

  calculateColor() {
    //console.log(this.corners.length)
    for (let i = 0; i < this.corners.length; i++) {
      let c = get(this.corners[i].x, this.corners[i].y);
      //console.log(c)
      // Convert the color to HEX
      let hexColor = this.rgbToHex(c[0], c[1], c[2]);
      //console.log(hexColor)
      // Retrieve the key associated with the HEX color
      let k = this.getKeyByHexColor(hexColor, palette);
      this.keys.push(k);
      // console.log(this.keys);
      let newKey = this.newColor(
        this.keys[0],
        this.keys[1],
        this.keys[2],
        this.keys[3],
        this.shift
      );
      console.log(newKey);

      // Assign all of the squares in the middle row with the key associated with the new color
      for (let i = 1; i < this.rows - 1; i++) {
        grid[i][this.mid] = newKey;
      }

      // Assign in all of the squares in the middle column with the key associated with the new color
      for (let j = 1; j < this.rows - 1; j++) {
        grid[this.mid][j] = newKey;
      }
    }
  }

  fillSquare(x, y, i, j) {
    noStroke();
    if (this.grid[i][j] === 0) {
      this.newCol = this.getHexColorByKey(0, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 1) {
      this.newCol = this.getHexColorByKey(1, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 2) {
      this.newCol = this.getHexColorByKey(2, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 3) {
      this.newCol = this.getHexColorByKey(3, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 4) {
      this.newCol = this.getHexColorByKey(4, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 5) {
      this.newCol = this.getHexColorByKey(5, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 6) {
      this.newCol = this.getHexColorByKey(6, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 7) {
      this.newCol = this.getHexColorByKey(7, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 8) {
      this.newCol = this.getHexColorByKey(8, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 9) {
      this.newCol = this.getHexColorByKey(9, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 10) {
      this.newCol = this.getHexColorByKey(10, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 11) {
      this.newCol = this.getHexColorByKey(11, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 12) {
      this.newCol = this.getHexColorByKey(12, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 13) {
      this.newCol = this.getHexColorByKey(13, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 14) {
      this.newCol = this.getHexColorByKey(14, palette);
      fill(this.newCol);
      rect(x, y, this.res, this.res);
    } else if (this.grid[i][j] === 15) {
      this.newCol = this.getHexColorByKey(15, palette);
      fill(this.newCol);
      rect(x, y, this.w, this.w);
    }
  }

  // Fill new color in middle row and colummn
  show() {
    // Fill in all of the squares in the middle row with the new color
    for (let i = 1; i < this.rows - 1; i++) {
      let j = this.mid;
      let x = i * this.res;
      let y = j * this.res;
      this.fillSquare(x, y, i, j);
    }
    // Fill in all of the squares in the middle column with the new color
    for (let j = 0; j < this.rows; j++) {
      let i = this.mid;
      let x = i * this.res;
      let y = j * this.res;
      this.fillSquare(x, y, i, j);
    }
  }
}
