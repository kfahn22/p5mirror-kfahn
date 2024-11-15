// Daniel Shiffman
// The Coding Train
// Coding Challenge 69: Steering Evolution

// Part 1: https://youtu.be/flxOkx0yLrY
// Part 2: https://youtu.be/XaOVH8ZSRNA
// Part 3: https://youtu.be/vZUWTlK7D2Q
// Part 4: https://youtu.be/ykOcaInciBI
// Part 5: https://youtu.be/VnFF5V5DS8s

const vehicles = [];
const food = [];
const poison = [];

let debug;
let r1 = 16;

function mousePressed() {
  "steer.jpg";
}

function setup() {
  createCanvas(800, 450);
  for (let i = 0; i < 50; i++) {
    const x = random(width);
    const y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }

  for (let i = 0; i < 40; i++) {
    const x = random(width);
    const y = random(height);
    food.push(createVector(x, y));
  }

  for (let i = 0; i < 20; i++) {
    const x = random(width);
    const y = random(height);
    poison.push(createVector(x, y));
  }

  debug = createCheckbox();

}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(0);

  if (random(1) < 0.1) {
    const x = random(width);
    const y = random(height);
    food.push(createVector(x, y));
  }

  if (random(1) < 0.01) {
    const x = random(width);
    const y = random(height);
    poison.push(createVector(x, y));
  }

  for (let i = 0; i < food.length; i++) {
    fill('#66D334');
    noStroke();
    ellipse(food[i].x, food[i].y, r1, r1);
  }

  for (let i = 0; i < poison.length; i++) {
    fill('#9253A1');
    noStroke();
    ellipse(poison[i].x, poison[i].y, r1, r1);
  }

  for (let i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].display();
    const newVehicle = vehicles[i].clone();
    if (newVehicle != null) {
      vehicles.push(newVehicle);
    }
    if (vehicles[i].dead()) {
      const x = vehicles[i].position.x;
      const y = vehicles[i].position.y;
      food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }

  }
}
