let shdr;
let vertSource, fragSource;

let video;

const vScale = 16;

function preload() {
  vertSource = loadStrings('shaders/default.vert');
  
  // Uncomment the following lines one by one. Each one have a 2D example.  
  // fragSource = loadStrings('shaders/animation_easing.frag');
  // fragSource = loadStrings('shaders/animation_sprite.frag');
  // fragSource = loadStrings('shaders/color_dither.frag');
  // fragSource = loadStrings('shaders/color_lut.frag');
  // fragSource = loadStrings('shaders/draw_digits.frag');
  // fragSource = loadStrings('shaders/filter_bilateral2D.frag');
  // fragSource = loadStrings('shaders/filter_boxBlur2D.frag');
  // fragSource = loadStrings('shaders/filter_edge2D.frag');
  fragSource = loadStrings('shaders/filter_gaussianBlur2D.frag');
  // fragSource = loadStrings('shaders/filter_laplacian2D.frag');
  // fragSource = loadStrings('shaders/filter_median2D.frag');
  // fragSource = loadStrings('shaders/filter_noiseBlur2D.frag');
  // fragSource = loadStrings('shaders/filter_radialBlur2D.frag');
  // fragSource = loadStrings('shaders/filter_sharpen2D.frag');
  // fragSource = loadStrings('shaders/generative_cnoise.frag');
  // fragSource = loadStrings('shaders/generative_curl.frag');
  // fragSource = loadStrings('shaders/generative_fbm.frag');
  // fragSource = loadStrings('shaders/generative_noised.frag');
  // fragSource = loadStrings('shaders/generative_pnoise.frag');
  // fragSource = loadStrings('shaders/generative_random.frag');
  // fragSource = loadStrings('shaders/generative_snoise.frag');
  // fragSource = loadStrings('shaders/generative_voronoi.frag');
  // fragSource = loadStrings('shaders/generative_worley.frag');
}

function setup() {
  createCanvas(512, 512, WEBGL);
  video = createCapture(VIDEO);
  // video.size(width / vScale, height / vScale);
  video.size(600, 400);

  video.hide();
  
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files. 
  // Check `index.html` to see how it's first added to the project. 
  // And then, the `shader.frag` file to how it's used.
  
  shdr = createShader(vertSource, fragSource);
}

function draw() {
  shader(shdr);
  
  //video.loadPixels();
  // for (var y = 0; y < video.height; y++) {
  //   for (var x = 0; x < video.width; x++) {
  //     var index = (video.width - x + 1 + (y * video.width)) * 4;
  //     var r = video.pixels[index + 0];
  //     var g = video.pixels[index + 1];
  //     var b = video.pixels[index + 2];
  //   }
  // }
  
  shdr.setUniform('u_tex0', video);
  
  
  // shdr.setUniform('u_resolution', [width, height] );
  // shdr.setUniform('u_mouse', [mouseX, mouseY]);
  // shdr.setUniform('u_time', millis() / 1000.0);
 
}

// let video;
// let shader;

// function setup() {
//   createCanvas(640, 480, WEBGL);
//   video = createCapture(VIDEO); // Capture video from webcam
//   video.size(width, height); // Set video size to match canvas
//   video.hide(); // Hide the video element
//   shader = createShader(vertShader, fragShader); // Create a shader
//   shader.texture("tex0", video); // Assign the video capture as a texture to the shader
// }
