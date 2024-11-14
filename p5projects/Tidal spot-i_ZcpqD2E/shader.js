let myObject;

function setup() {
  createCanvas(400, 400, WEBGL);
  myObject = new CustomObject();
}

function draw() {
  background(200);

  // Apply the shader to the object's display method
  myObject.display();
}

class CustomObject {
  constructor() {
    // Load the shader in the constructor
    this.myShader = createShader(vertShader, fragShader);
  }

  display() {
    // Use the shader in the display method
    shader(this.myShader);

    // Draw your object here
    // For simplicity, we'll just draw a box
    box(100);

    // Reset shader to default shader
    resetShader();
  }
}

// Vertex shader source code
const vertShader = `
  void main() {
    // Position calculation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader source code
const fragShader = `
  precision mediump float;
  void main() {
    // Color calculation
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
  }
`;
