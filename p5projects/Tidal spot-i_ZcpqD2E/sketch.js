let myObject;

function setup() {
  createCanvas(400, 400, WEBGL);
  myObject = new CustomObject();
}

function draw() {
  background(200);

  // Apply the shader to the object's display method
  myObject.show();
}

class CustomObject {
  constructor() {
    // Load the shader in the constructor
    this.myShader = createShader("shader.vert", "shader.frag");
  }

//   display() {
//     // Use the shader in the display method
//     shader(this.myShader);

//     // Draw your object here
//     // For simplicity, we'll just draw a box
//     box(100);

//     // Reset shader to default shader
//     resetShader();
//   }

  show() {
    this.myShader.setUniform("u_resolution", [width, height]);
    this.myShader.setUniform("u_mouse", [
      mouseX,
      map(mouseY, 0, height, height, 0),
    ]);
    this.myShader.setUniform("iFrame", frameCount / 20);
    this.myShader.setUniform("u_time", millis() / 1000.0);

    shader(this.myShader);

    // rect gives us some geometry on the screen
    rect(0, 0, width, height);
  }
}

// // Vertex shader source code
// const vertShader = `
//   void main() {
//     // Position calculation
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// // Fragment shader source code
// const fragShader = `
//   precision mediump float;
//   void main() {
//     // Color calculation
//     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
//   }
// `;
