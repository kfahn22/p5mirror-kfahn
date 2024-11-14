let shdr;
let vertSource, fragSource;

let img_danny;
let img_sprite;
let img_noise;
let img_lut;

function preload() {
  
  vertSource = loadStrings('shaders/default.vert');
  
  // Uncomment the following lines one by one. Each one have a 2D example.  
  //
  fragSource = loadStrings('shaders/gear.frag');
  // fragSource = loadStrings('shaders/animation_easing.frag');
  // fragSource = loadStrings('shaders/animation_sprite.frag');
  // fragSource = loadStrings('shaders/color_dither.frag');
  // fragSource = loadStrings('shaders/color_lut.frag');
  // fragSource = loadStrings('shaders/draw_digits.frag');
  //fragSource = loadStrings('shaders/filter_bilateral2D.frag');
  // fragSource = loadStrings('shaders/filter_boxBlur2D.frag');
  // fragSource = loadStrings('shaders/filter_edge2D.frag');
  // fragSource = loadStrings('shaders/filter_gaussianBlur2D.frag');
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
  
  vertSource = resolveLygia(vertSource);
  fragSource = resolveLygia(fragSource);
  // Hi There! this ^ two lines ^ use `resolveLygia( ... )` to resolve the LYGIA dependencies from the preloaded `shader.vert` and `shader.frag` files. 
  // Check `index.html` to see how it's first added to the project. 
  // And then, the `shader.frag` file to how it's used.
  
  shdr = createShader(vertSource, fragSource);
}

function draw() {
  shader(shdr);
  
  shdr.setUniform('u_tex0', img_danny);
  shdr.setUniform('u_spriteTex', img_sprite);
  shdr.setUniform('u_noiseTex', img_noise);
  shdr.setUniform('u_lutTex', img_lut);
  
  shdr.setUniform('u_resolution', [width, height] );
  shdr.setUniform('u_mouse', [mouseX, mouseY]);
  shdr.setUniform('u_time', millis() / 1000.0);
    
  rect(0, 0, width, height);
}