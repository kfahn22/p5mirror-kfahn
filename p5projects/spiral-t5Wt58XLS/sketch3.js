let radius = 100;
let angle1, angle2;

function setup() {
  createCanvas(400, 400);
  angle1 = radians(45); // Angle in radians for point 1
  angle2 = radians(135); // Angle in radians for point 2
}

function draw() {
  background(220);

  // Draw the circle
  translate(width / 2, height / 2);
  ellipse(0, 0, radius * 2);

  // Draw the points on the circumference
  let x1 = radius * cos(angle1);
  let y1 = radius * sin(angle1);
  let x2 = radius * cos(angle2);
  let y2 = radius * sin(angle2);

  fill(255, 0, 0);
  ellipse(x1, y1, 10, 10); // Point 1
  ellipse(x2, y2, 10, 10); // Point 2

  // Calculate and display the distance between the points along the circumference
  let distance = abs(angle2 - angle1) * radius;
  textAlign(CENTER, CENTER);
  fill(0);
  text(`Distance: ${distance.toFixed(2)}`, 0, height / 2 - 20);
}
