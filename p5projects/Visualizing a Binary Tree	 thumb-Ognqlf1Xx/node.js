// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

function Node(val, x, y) {
  this.value = val;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
  this.r = 70;
  this.number = [];
}

Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

Node.prototype.visit = function(parent) {
  if (this.left != null) {
    this.left.visit(this);
  }
  console.log(this.value);
  console.log(this.value);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(40);
  text(this.value, this.x, this.y);
  strokeWeight(8);
  stroke(255);
  noFill();
  ellipse(this.x, this.y, this.r, this.r);
  stroke(255, 50);
  line(parent.x, parent.y, this.x, this.y);
  if (this.right != null) {
    this.right.visit(this);
  }
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
      this.left.rang(n);
      this.left.x = this.x - 100;
      this.left.y = this.y + 60;
    } else {
      this.left.addNode(n)
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
      this.right.rang(n);
      this.right.x = this.x + 100;
      this.right.y = this.y + 60;

    } else {
      this.right.addNode(n);
    }
  }
  
}

Node.prototype.rang = function(n) {
  this.number.push(n.value);
  //console.log(this.number);
  // find range
  let mn = min(this.number);
  let mx = max(this.number);
  let rn =  map(n.value, mn, mx, 60, 120);  
  console.log(rn);
}

Node.prototype.show = function(n) {
      stroke(255, 75);
      line(parent.x, parent.y, this.x , this.y);
      fill('#9253A1');
      noStroke();
      ellipse(this.x, this.y, this.r, this.r);
      strokeWeight(10);
      stroke(255);
      textAlign(CENTER);
      text(this.value, this.x, this.y);
}