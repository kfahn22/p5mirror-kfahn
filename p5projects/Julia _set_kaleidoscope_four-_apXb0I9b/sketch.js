// This sketch renders the Julia set within the Koch curve using different values of c
// The code for the Koch curve is based on KIFS Fractals explained! tutorial by
// The Art of Code  

new p5(sa => {

  // a shader variable
  let shader0;

  // Declare variables
  let button0;
  let button;
  let c0;
  let graphics0;
  
  sa.clear = () => {
      sa.clearStorage();
  }

  sa.preload = () => {
      // load the the shader
      shader0 = sa.loadShader('julia.vert', 'julia.frag');
  }

  sa.setup = () => {
      sa.pixelDensity(1);
      sa.noStroke();

      let para = sa.createP("Julia Set Kaleidoscope--Move Mouse to See");
      para.position(10,10);
      let divA = sa.createDiv();
      divA.position(10, 110);
      divA.style('max-width', '200px');
      divA.style('align-content', 'center');

      c0 = sa.createCanvas(400,400, sa.WEBGL);
      c0.parent(divA);
      sa.pixelDensity(1);
      // shaders require WEBGL mode to work
      graphics0 = sa.createGraphics(400, 400, sa.WEBGL);

      divAr = sa.createDiv();
      divAr. position(850, 110);
      radio = sa.createRadio();
      radio.parent(divAr);
      //divAr.style('maxWidth', '200px');
      radio.option('0.0', 'c = ( -0.7269, 0.188 )');
      radio.option('1.0', 'c = ( -0.8, 0.156 )');
      radio.option('2.0', 'c = ( 0.285, 0.01 )');
      radio.option('3.0', 'c = ( 0.285, 0.0)');
      radio.option('4.0', 'c = ( -0.4, 0.6 )');
      radio.option('5.0', 'c = (  0.45, 0.1428)');
      radio.option('6.0', 'c = ( -0.70176, -0.3842 )');
      radio.option('7.0', 'c = ( -0.835, -0.2321)');
      radio.option('8.0', 'c = ( 0.0, -0.8 )');
      radio.option('9.0', 'c = ( -.6995, .37999 )');
      radio.option('10.0', 'c = ( -0.194, .6557 )');
      radio.option('11.0', 'c = ( -0.74543, .11301 )');
      radio.option('12.0', 'c = ( 0.27334, .00742 )');
      radio.option('13.0', 'c = ( .355, .355 )');
      radio.option('14.0', 'c = ( -.54, 0.54 )');
      radio.option('15.0', 'c = ( -.4, -0.59 )');
      radio.option('16.0', 'c = ( 0.32, 0.043 )');
 
     
  }

  sa.draw = () => {

      //pass the uniforms to the shader
      //this is done separately for each canvas instance
      shader0.setUniform('u_resolution', [sa.width, sa.height]);
      shader0.setUniform("iMouse", [sa.mouseX, sa.map(sa.mouseY, 0, sa.height, sa.height, 0)]);
      shader0.setUniform('choice', 3.0);
      shader0.setUniform('tile', 0.0);
      sa.shader(shader0);
      sa.rect(0, 0, sa.width, sa.height);
  }

  sa.saveTile0 = () => {
      //sa.saveCanvas(c0, '0.png');
      sa.storeItem("img0", c0.elt.toDataURL());
  }

  
});

new p5(sb => {

  // a shader variable
  let shader1;

  // Declare variables
  let button1;
  let c1;
  let graphics1;
  
  sb.clear = () => {
      sb.clearStorage();
  }

  sb.preload = () => {
      // load the the shader
      shader1 = sb.loadShader('julia.vert', 'julia.frag');
  }

  sb.setup = () => {
      sb.pixelDensity(1);
      sb.noStroke();

      let para = sb.createP("Julia Set");
      para.position(10,10);
      para.style('font-size', '30px');
      let divB = sb.createDiv();
      divB.position(410, 110);
      divB.style('max-width', '200px');
      divB.style('align-content', 'center');

      c1 = sb.createCanvas(400,400, sb.WEBGL);
      c1.parent(divB);
      sb.pixelDensity(1);
      // shaders require WEBGL mode to work
      graphics1 = sb.createGraphics(400, 400, sb.WEBGL);

  }

  sb.draw = () => {

      //pass the uniforms to the shader
      //this is done separately for each canvas
      //instance
      shader1.setUniform('u_resolution', [sb.width, sb.height]);
      shader1.setUniform("iMouse", [sb.mouseX, sb.map(sb.mouseY, 0, sb.height, sb.height, 0)]);
      shader1.setUniform('choice', 4.0);
      shader1.setUniform('tile', 1.0);
      sb.shader(shader1);
      sb.rect(0, 0, sb.width, sb.height);
  }



  sb.saveTile1 = () => {
      //sb.saveCanvas(c1, '0.png');
      sb.storeItem("img0", c1.elt.toDataURL());
  }
  
  sb.clear = () => {
    sb.clearStorage();
  }

});


new p5(sc => {

  // a shader variable
  let shader2;

  // Declare variables
  let button2;
  let c2;
  let graphics2;
  
  sc.clear = () => {
      sc.clearStorage();
  }

  sc.preload = () => {
      // load the the shader
      shader2 = sc.loadShader('julia.vert', 'julia.frag');
  }

  sc.setup = () => {
      sc.pixelDensity(1);
      sc.noStroke();

      // let para = sc.createP("Julia Set");
      // para.position(10,10);
      // para.style('font-size', '30px');
      let divC = sc.createDiv();
      divC.position(10, 510);
      divC.style('max-width', '200px');
      divC.style('align-content', 'center');

      c2 = sc.createCanvas(400,400, sc.WEBGL);
      c2.parent(divC);
      sc.pixelDensity(1);
      // shaders require WEBGL mode to work
      graphics2 = sc.createGraphics(400, 400, sc.WEBGL);

  }

  sc.draw = () => {

      //pass the uniforms to the shader
      //this is done separately for each canvas
      //instance
      shader2.setUniform('u_resolution', [sc.width, sc.height]);
      shader2.setUniform("iMouse", [sc.mouseX, sc.map(sc.mouseY, 0, sc.height, sc.height, 0)]);
      shader2.setUniform('choice', 6.0);
      shader2.setUniform('tile', 2.0);
      sc.shader(shader2);
      sc.rect(0, 0, sc.width, sc.height);
  }

  sc.saveTile0 = () => {
      //sc.saveCanvas(c0, '0.png');
      sc.storeItem("img3", c2.elt.toDataURL());
  }
  
  sc.clear = () => {
    sc.clearStorage();
  }

});


new p5(sd => {

  // a shader variable
  let shader3;

  // Declare variables
  let button3;
  let c3;
  let graphics3;
  
  sd.clear = () => {
      sd.clearStorage();
  }

  sd.preload = () => {
      // load the the shader
      shader3 = sd.loadShader('julia.vert', 'julia.frag');
  }

  sd.setup = () => {
      sd.pixelDensity(1);
      sd.noStroke();

      // let para = sd.createP("Julia Set");
      // para.position(10,10);
      // para.style('font-size', '30px');
      let divD = sd.createDiv();
      divD.position(410, 510);
      divD.style('max-width', '200px');
      divD.style('align-content', 'center');

      c3 = sd.createCanvas(400,400, sd.WEBGL);
      c3.parent(divD);
      sd.pixelDensity(1);
      // shaders require WEBGL mode to work
      graphics3 = sd.createGraphics(400, 400, sd.WEBGL);

  
  }

  sd.draw = () => {

      //pass the uniforms to the shader
      //this is done separately for each canvas instance
      shader3.setUniform('u_resolution', [sd.width, sd.height]);
      shader3.setUniform("iMouse", [sd.mouseX, sd.map(sd.mouseY, 0, sd.height, sd.height, 0)]);
      shader3.setUniform('choice', 7.0);
      shader3.setUniform('tile', 3.0);
      sd.shader(shader3);
      sd.rect(0, 0, sd.width, sd.height);
  }
  sd.saveTile0 = () => {
      //sd.saveCanvas(c3, '0.png');
      sd.storeItem("img3", c3.elt.toDataURL());
  }
 
});


