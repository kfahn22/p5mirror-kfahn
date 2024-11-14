class PersianRug {
  constructor(x, y, shift, res, grid, size, rows, ncol, buffer) {
    this.x = x;
    this.y = y;
    this.shift = shift;
    this.res = res;
    this.grid = grid;
    this.i = this.x / this.res;
    this.j = this.y / this.res;
    this.size = size;
    this.rows = rows;
    this.ncol = ncol;
    this.buffer = buffer;
    this.mid = floor(this.size / 2);
    
    this.shapes = [];
    //this.corners = [];
    this.keys = [];
  }

  getHexColorByKey(key, palette) {
    return palette.colors[key] || null;
  }

  newColor(n1, n2, n3, n4, shift) {
    return (n1 + n2 + n3 + n4 + shift) % this.ncol;
  }
  
  calculateColor() {
      let newKey = this.newColor(
        this.grid[this.i][this.j],
         this.grid[this.i+ this.size - 1][this.j],
         this.grid[this.i][this.j + this.size - 1],
         this.grid[this.i+this.size - 1][this.j+this.size - 1],
        this.shift
      );

      let start = this.i + 1;
      let n = this.i + this.size - 1;
      let j = this.j + this.mid;
      for (let i = start; i < n; i++) {
        this.grid[i][j] = newKey;
      }
      start = this.j + 1;
      let i = this.i + this.mid;
      n = this.j + this.size - 1;
      for (let j = start; j < n; j++) {
        this.grid[i][j] = newKey;
    }
  }

  fillSquare(x, y, i, j) {
    this.buffer.noStroke();
    let key = this.grid[i][j];
    if (key !== null) {
      fill(this.getHexColorByKey(key, palette));
      this.buffer.rect(x, y, this.res, this.res);
      
      this.shapes.push(new Supershape(x, y, this.res, 1, 1, key))
     
   }
  }

  show() {
   
    for (let i = 1; i < this.rows - 1; i++) {
      for (let j = 0; j < this.rows - 1; j++) {
        let x = i * this.res;
        let y = j * this.res;
        this.fillSquare(x, y, i, j);
      }
    }
     push()
    stroke(255);
    for (let s of this.shapes) {
      s.show();
    }
    pop()
  }
}
