// Check out this discussion later
//https://discourse.processing.org/t/texture-as-data-in-shader-has-odd-behavior/33197

let img;
let fx;
let SIZE = 4;
let values = [125, 45, 240, 200];
let pg;

function setup() {
  createCanvas(500, 300, WEBGL);
  pg = createGraphics(300, 300, WEBGL);
  fx = pg.createShader(
    `// Vertex
    precision mediump float;

    attribute vec3 aPosition;
    varying vec2 vPosition;

    void main() {
      // Given the geometry of quad, this should go from -1,-1 to 1,1
      vPosition = aPosition.xy;
      gl_Position = vec4(aPosition, 1.0); 
    }`,
    `// Fragment
    precision mediump float;

    varying vec2 vPosition;
    uniform sampler2D tex1;
    uniform int tex1Size;

    void main() {
      // Calculate index based on horizontal position
      // Convert position from -1..1 to range 0..1
      float xOffset = (vPosition.x + 1.0) / 2.0;
      // Convert offset 0..1 to index 0, 1, 2, 3
      int index = int(xOffset * float(tex1Size));
      
      vec4 data = texture2D(
        tex1,
        // Convert index into pixel coordinate
        // (note: offset by 0.5 to ensure we sample the center of each pixel)
        vec2((float(index) + 0.5) / float(tex1Size), 0.5)
      );

      float v = float(index) / float(tex1Size);
      gl_FragColor = vec4(data.rrr, 1.0);
      // gl_FragColor = vec4(v, v, v, 1.0);
    }`
  );
  
  noStroke();
  pg.noStroke();
  
  img = createImage(SIZE, 1);
}

function draw() {
  background('palegreen');
  
  img.loadPixels();

  for (let x = 0; x < img.width; x++) {
    img.pixels[x * 4 + 0] = values[x]; // R
    img.pixels[x * 4 + 1] = 0; // G
    img.pixels[x * 4 + 2] = 0; // B
    img.pixels[x * 4 + 3] = 255;
  }

  img.updatePixels();

  // Unfortunately this has no effect on texture2D() that I can tell
  // let tex = pg._renderer.getTexture(img);
  // let gl = WebGLRenderingContext;
  // tex.setInterpolation(gl.NEAREST, gl.NEAREST);
  pg.shader(fx);
  // Must set uniforms **after** calling shader
  fx.setUniform("tex1", img);
  fx.setUniform("tex1Size", SIZE);
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);

  texture(pg);
  rectMode(CENTER);
  rect(0, 0, 300, 300);

  noLoop();
}
