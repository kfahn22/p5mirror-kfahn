// This sketch was created to help youth create tiles for the wave function collapse algorithm

// This sketch is based on the Local Storage tutorial by Dan Shiffman
// https://www.youtube.com/watch?v=_SRS8b4LcZ8

new p5(sa => {

    // a shader variable
    let shader0;

    // Declare variables
    let button, button0, button1;
    let checkbox;
    let c0;
    let graphics0;
    let radioLarge, radioSmall;
    let inp0, inp1, inp2, inp3;
    let lrShapeA, smShapeA;
    let shape1, shape2;
    let sh1 = 0.0;
    let sh2 = 0.0;
    let grid = 0.0;
    
    sa.clear = () => {
        sa.clearStorage();
    }

    sa.preload = () => {
        // load the the shader
        shader0 = sa.loadShader('create.vert', 'create.frag');
    }

    sa.setup = () => {
        sa.pixelDensity(1);
        sa.noStroke();

        // let para = sa.createP("Tile Creator");
        // para.position(10,10);
        // para.style('font-size', '30px');
        let divA = sa.createDiv();
        divA.position(10, 420);
        divA.style('max-width', '200px');
        divA.style('align-content', 'center');

        c0 = sa.createCanvas(100, 100, sa.WEBGL);
        c0.parent(divA);
        sa.pixelDensity(1);
        // shaders require WEBGL mode to work
        graphics0 = sa.createGraphics(100, 100, sa.WEBGL);

        button0 = sa.createButton('SAVE TILE A');
        button0.parent(divA);
        button0.mousePressed(sa.saveTile0);
      
        button = sa.createButton("CLEAR STORAGE");
        button.position(450, 625);
        button.mousePressed(sa.clear);
      
        button1 = sa.createButton("SHARE ARTWORK");
        button1.position(450, 675);
        button1.mousePressed(sa.share);
        button1.id('share');
      
        // Create sliders for colors
        r1Slider = sa.createSlider(0, 255, 0);
        g1Slider = sa.createSlider(0, 255, 0);
        b1Slider = sa.createSlider(0, 255, 0);
        r2Slider = sa.createSlider(0, 255, 255);
        g2Slider = sa.createSlider(0, 255, 255);
        b2Slider = sa.createSlider(0, 255, 255);
        rad1Slider = sa.createSlider(0, 100, 50, 1);
        rad2Slider = sa.createSlider(0, 100, 25, 1);
        x1Slider = sa.createSlider(0, 300, 200, 1);
        y1Slider = sa.createSlider(0, 300, 100, 1);
        x2Slider = sa.createSlider(0, 300, 25, 1);
        y2Slider = sa.createSlider(0, 300, 10, 1);

        // Create a grid so tht symmetry can be checked
        checkbox = sa.createCheckbox('SHOW GRID LINES', false);
        checkbox.position(450, 725);
        checkbox.changed(sa.myCheckedEvent);
      
       // Allow user to choose circle or square shape
        radioLabel1 = sa.createP('LARGER SHAPE');
        radioLabel1.position(10,550);
        radioLabel2 = sa.createP('SMALLER SHAPE');
        radioLabel2.position(210,550);
       
        let div9a = sa.createDiv();
        let div9b = sa.createDiv();
        div9a.position(10, 575);
        div9a.class('shape');
        div9b.position(210, 575);
        div9b.class('shape');
      
        inpALabel = sa.createP('Tile A');
        inpALabel.parent(div9a);
        inpBLabel = sa.createP('Tile A');
        inpBLabel.parent(div9b);
      
        radioLarge = sa.createRadio();
        radioLarge.option('0.0', 'circle');
        radioLarge.option('1.0', 'square');
        // radioLarge.option('2.0', 'triangle');
        radioLarge.selected('0.0');
        radioLarge.attribute('name', 'largeA');
        radioLarge.parent(div9a);
        
        radioSmall = sa.createRadio();
        radioSmall.option('0.0', 'circle');
        radioSmall.option('1.0', 'square');
        // radioSmall.option('2.0', 'hexagon');
        radioSmall.selected('0.0');
        radioSmall.attribute('name', 'smallA');
        radioSmall.parent(div9b);

        let colors = sa.getItem("colors");
        if (colors !== null) {
            r1Slider.value(colors.r1);
            g1Slider.value(colors.g1);
            b1Slider.value(colors.b1);
            r2Slider.value(colors.r2);
            g2Slider.value(colors.g2);
            b2Slider.value(colors.b2);
        }
        r1Slider.changed(sa.storeColors);
        g1Slider.changed(sa.storeColors);
        b1Slider.changed(sa.storeColors);
        r2Slider.changed(sa.storeColors);
        g2Slider.changed(sa.storeColors);
        b2Slider.changed(sa.storeColors);

        let parameters = sa.getItem("parameters");
        if (parameters !== null) {
            rad1Slider.value(parameters.rad1);
            rad2Slider.value(parameters.rad2);
            x1Slider.value(parameters.x1);
            y1Slider.value(parameters.y1);
            x2Slider.value(parameters.x2);
            y2Slider.value(parameters.y2);
        }
        rad1Slider.changed(sa.storeParameters);
        rad2Slider.changed(sa.storeParameters);
        x1Slider.changed(sa.storeParameters);
        y1Slider.changed(sa.storeParameters);
        x2Slider.changed(sa.storeParameters);
        y2Slider.changed(sa.storeParameters);

        let gridValue = sa.getItem("grid");
        if (gridValue != null) {
          let grid = gridValue;
        }
      
      
        // Organize the layout
        let div1 = sa.createDiv();
        // div1.style('font-size', '16px');
        div1.position(10, 850);
        colAlabel = sa.createP('Color A');
        colAlabel.parent(div1);
        r1Slider.parent(div1);
        g1Slider.parent(div1);
        b1Slider.parent(div1);

        let div2 = sa.createDiv();
        div2.style('font-size', '16px');
        div2.position(10, 950);
        colBlabel = sa.createP('Color B');
        colBlabel.parent(div2);
        r2Slider.parent(div2);
        g2Slider.parent(div2);
        b2Slider.parent(div2);

        let para2 = sa.createP("LARGER SHAPE");
        para2.position(450,100);
        let div8a = sa.createDiv();
        // div8a.style('font-size', '16px');
        div8a.position(450, 150);
        rad1label = sa.createP('Radius 1');
        rad1label.parent(div8a);
        // rad1label.style("color", "#fff");
        rad1Slider.style("width", "180px");
        rad1Slider.parent(div8a);

        let para3 = sa.createP("SMALLER SHAPE");
        para3.position(450, 350);
        let div3a = sa.createDiv();
        div3a.position(450, 395);
        rad2label = sa.createP('Radius 2');
        rad2label.parent(div3a);
        rad2Slider.style("width", "180px");
        rad2Slider.parent(div3a);

        let div4a = sa.createDiv();
        div4a.position(450, 210);
        x1label = sa.createP('X1 offset');
        x1label.parent(div4a);
        x1Slider.parent(div4a);
        x1Slider.style("width", "180px");

        let div5a = sa.createDiv();
        div5a.position(450, 270);
        y1label = sa.createP('Y1 offset');
        y1label.parent(div5a);
        y1Slider.parent(div5a);
        y1Slider.style("width", "180px");

        let div6a = sa.createDiv();
        div6a.position(450, 455);
        x2label = sa.createP('X2 offset');
        x2label.parent(div6a);
        x2Slider.parent(div6a);
        x2Slider.style("width", "180px");

        let div7a = sa.createDiv();
        div7a.position(450, 515);
        y2label = sa.createP('Y2 offset');
        y2label.parent(div7a);
        y2Slider.parent(div7a);
        y2Slider.style("width", "180px");
        
        
    }

    sa.draw = () => {
        // Get color values
        let r1 = r1Slider.value();
        let g1 = g1Slider.value();
        let b1 = b1Slider.value();
        let r2 = r2Slider.value();
        let g2 = g2Slider.value();
        let b2 = b2Slider.value();

        // Get x and y positions
        let rad1 = rad1Slider.value();
        let newrad1 = sa.map(rad1, 0, 100, 0.0, 1.0);
        let rad2 = rad2Slider.value();
        let newrad2 = sa.map(rad2, 0, 100, 0.0, 1.0);
        let x1 = x1Slider.value();
        let x1Offset = sa.map(x1, 0, 300, -1.5, 1.5);
        let y1 = y1Slider.value();
        let y1Offset = sa.map(y1, 0, 300, -1.5, 1.5);
        let x2 = x2Slider.value();
        let x2Offset = sa.map(x2, 0, 100, -0.25, 0.25);
        let y2 = y2Slider.value();
        let y2Offset = sa.map(y2, 0, 100, -0.25, 0.25);
      
        let sh1 = radioLarge.value();
        let sh2 = radioSmall.value();
        console.log(sh2);
        //pass the uniforms to the shader
        //this is done separately for each canvas
        //instance
        shader0.setUniform('u_resolution', [sa.width, sa.height]);
        shader0.setUniform('colorAr', r1);
        shader0.setUniform('colorAg', g1);
        shader0.setUniform('colorAb', b1);
        shader0.setUniform('colorBr', r2);
        shader0.setUniform('colorBg', g2);
        shader0.setUniform('colorBb', b2);
        shader0.setUniform('rad1', newrad1);
        shader0.setUniform('rad2', newrad2);
        shader0.setUniform('offset1', [x1Offset, y1Offset]);
        shader0.setUniform('offset2', [x2Offset, y2Offset]);
        shader0.setUniform('shape1', sh1);
        shader0.setUniform('shape2', sh2);
        shader0.setUniform('grid', grid);
        sa.shader(shader0);
        sa.rect(0, 0, sa.width, sa.height);
    }

    sa.storeColors = () => {
        let colors = {
            r1: r1Slider.value(),
            g1: g1Slider.value(),
            b1: b1Slider.value(),
            r2: r2Slider.value(),
            g2: g2Slider.value(),
            b2: b2Slider.value(),
        }

        sa.storeItem("colors", colors);
    }
   
    sa.share = () => {
        sa.saveCanvas(canvas, 'img.png');
      }
    
    sa.storeParameters = () => {
        let parameters = {
            rad1: rad1Slider.value(),
            rad2: rad2Slider.value(),
            x1: x1Slider.value(),
            y1: y1Slider.value(),
            x2: x2Slider.value(),
            y2: y2Slider.value(),
        }
        sa.storeItem("parameters", parameters);
    }
    
//     sa.saveShapeA1 = () => {
//       // let shape1 = inp0.value();
//       // // if (shape1 == 'circle') {
//       // //   lg = 0.0;
//       // // } else if (shape1 == 'square') {
//       // //   lg = 1.0;
//       // // }
//       //  let shape2 = inp1.value();
//       // if (shape2 == 'circle') {
//       //   sm = 0.0;
//       // } else if (shape1 == 'square') {
//       //   sm = 1.0;
//       // }
//       // let shapes = {
//         lrShapeA: inp0.value(),
//         //smShapeA: inp1.value(),
//       // }
//       // let lgShapeA = {
//       //    lgShapeA: inp0.value(),
//       //    // smShapeA: inp1.value(),
//       //    // lgShapeB: inp2.value(),
//       //    // smShapeB: inp3.value(),
//       // }
//     sa.storeItem("shapes", shapes);
//     }

    
    
    sa.saveTile0 = () => {
        //sa.saveCanvas(c0, '0.png');
        sa.storeItem("img0", c0.elt.toDataURL());
    }
    
    sa.clear = () => {
      sa.clearStorage();
    }
    
    sa.myCheckedEvent = () => {
      if (checkbox.checked()) {
        grid = 1.0;
      } 
      else {
        grid = 0.0;
      }
      sa.storeItem("grid", grid);
    }

});

new p5(sb => {
    // a shader variable
    let shader1;
    let button1;
    let c1;
    let graphics1;
    let grid ;

    sb.preload = () => {
        // load the the shader
        shader1 = sb.loadShader('create.vert', 'create.frag');
    }

    sb.setup = () => {
        sb.pixelDensity(1);
        sb.noStroke();

        let divB = sb.createDiv();
        divB.position(112, 420);
        divB.style('max-width', '100px');
        c1 = sb.createCanvas(100, 100, sb.WEBGL);
        c1.parent(divB);
        sb.pixelDensity(1);
        graphics1 = sb.createGraphics(100, 100, sb.WEBGL);

        button1 = sb.createButton('SAVE TILE B');
        button1.mousePressed(sb.saveTile1);
        button1.parent(divB);

        let div10a = sb.createDiv();
        let div10b = sb.createDiv();
        div10a.position(110, 575);
        div10a.class('shape');
        div10b.position(310, 575);
        div10b.class('shape');
      
        inpALabel = sb.createP('Tile B');
        inpALabel.parent(div10a);
        inpBLabel = sb.createP('Tile B');
        inpBLabel.parent(div10b);
      
        radioLarge = sb.createRadio();
        radioLarge.option('0.0', 'circle');
        radioLarge.option('1.0', 'square');
        radioLarge.selected('0.0');
        radioLarge.attribute('name', 'largeB');
        radioLarge.parent(div10a);
        
        radioSmall = sb.createRadio();
        radioSmall.option('0.0', 'circle');
        radioSmall.option('1.0', 'square');
        radioSmall.selected('0.0');
        radioSmall.attribute('name', 'smallB');
        radioSmall.parent(div10b);
      
        let colors = sb.getItem("colors");
        if (colors !== null) {
            r1Slider.value(colors.r1);
            g1Slider.value(colors.g1);
            b1Slider.value(colors.b1);
            r2Slider.value(colors.r2);
            g2Slider.value(colors.g2);
            b2Slider.value(colors.b2);
        }

        let parameters = sb.getItem("parameters");
        if (parameters !== null) {
            rad1Slider.value(parameters.rad1);
            rad2Slider.value(parameters.rad2);
            x1Slider.value(parameters.x1);
            y1Slider.value(parameters.y1);
            x2Slider.value(parameters.x2);
            y2Slider.value(parameters.y2);
        }
      
        let gridValue = sb.getItem("grid");
        if (gridValue != null) {
          let grid = gridValue;
          // console.log(grid);
        }
      
     
    }

    sb.draw = () => {
        let r1 = r1Slider.value();
        let g1 = g1Slider.value();
        let b1 = b1Slider.value();
        let r2 = r2Slider.value();
        let g2 = g2Slider.value();
        let b2 = b2Slider.value();
        let rad1 = rad1Slider.value();  
        let newrad1 = sb.map(rad1, 0, 100, 0.0, 1.0);
        let rad2 = rad2Slider.value();  
        let newrad2 = sb.map(rad2, 0, 100, 0.0, 1.0);
        let x1 = x1Slider.value();
        let x1Offset = sb.map(x1, 0, 300, -2.5, 0.5);
        let y1 = y1Slider.value();
        let y1Offset = sb.map(y1, 0, 300, -1.5, 1.5);
        let x2 = x2Slider.value();
        let x2Offset = sb.map(x2, 0, 100, -0.25, 0.25);
        let y2 = y2Slider.value();
        let y2Offset = sb.map(y2, 0, 100, -0.25, 0.25);

        let sh1 = radioLarge.value();
        let sh2 = radioSmall.value();
      
        shader1.setUniform('u_resolution', [sb.width, sb.height]);
        shader1.setUniform('colorAr', r1);
        shader1.setUniform('colorAg', g1);
        shader1.setUniform('colorAb', b1);
        shader1.setUniform('colorBr', r2);
        shader1.setUniform('colorBg', g2);
        shader1.setUniform('colorBb', b2);
        // shader1.setUniform('tileChoice', 1.0);
        shader1.setUniform('rad1', newrad1);
        shader1.setUniform('rad2', newrad2);
        shader1.setUniform('offset1', [x1Offset, y1Offset]);
        shader1.setUniform('offset2', [x2Offset, y2Offset]);
        shader1.setUniform('shape1', sh1);
        shader1.setUniform('shape2', sh2);
        shader1.setUniform('grid', grid);
        sb.shader(shader1);
        sb.rect(0, 0, sb.width, sb.height)
    }


    sb.saveTile1 = () => {
        //sb.saveCanvas(c1, '1.png');
        sb.storeItem("img1", c1.elt.toDataURL());
    }
});


new p5(sc => {
    // a shader variable
    let shader2;
    let button2;
    let c2;
    let graphics3;
  
    sc.preload = () => {
        // load the the shader
        shader2 = sc.loadShader('create.vert', 'create.frag');
    }

    sc.setup = () => {
        sc.pixelDensity(1);
        sc.noStroke();
        // shaders require WEBGL mode to work

        let divC = sc.createDiv();
        divC.position(214, 420);
        divC.style('max-width', '100px');
        c2 = sc.createCanvas(100, 100, sc.WEBGL);
        c2.parent(divC);
        sc.pixelDensity(1);
        graphics3 = sc.createGraphics(100, 100, sc.WEBGL);

        button2 = sc.createButton('SAVE TILE C');
        button2.mousePressed(sc.saveTile2);
        button2.parent(divC);

        let colors = sc.getItem("colors");
        if (colors !== null) {
            r1Slider.value(colors.r1);
            g1Slider.value(colors.g1);
            b1Slider.value(colors.b1);
            r2Slider.value(colors.r2);
            g2Slider.value(colors.g2);
            b2Slider.value(colors.b2);
        }
        
    }

    sc.draw = () => {
        let r1 = r1Slider.value();
        let g1 = g1Slider.value();
        let b1 = b1Slider.value();
        let r2 = r2Slider.value();
        let g2 = g2Slider.value();
        let b2 = b2Slider.value();
        shader2.setUniform('u_resolution', [sc.width, sc.height]);
        shader2.setUniform('colorAr', r1);
        shader2.setUniform('colorAg', g1);
        shader2.setUniform('colorAb', b1);
        shader2.setUniform('colorBr', r2);
        shader2.setUniform('colorBg', g2);
        shader2.setUniform('colorBb', b2);
        shader2.setUniform('shape1', 2.0);
        shader2.setUniform('shape2', 2.0);
        sc.shader(shader2);
        sc.rect(0, 0, sc.width, sc.height)
    }
 
    sc.saveTile2 = () => {
        //sc.saveCanvas(c2, '2.png');
        sc.storeItem("img2", c2.elt.toDataURL());
    }
});

new p5(wfc => {
    //let g;

    // Code for inputing new tiles
    let w = 100;
    let h = 100;

    let imgData = [];
    const tiles = [];
    const tileImages = [];

    let grid = [];

    const DIM = 10;
    let graphics;

    wfc.preload = () => {
        for (let i = 0; i < 3; i++) {
            imgData[i] = wfc.getItem(`img${i}`);
            if (imgData[i] !== null) {
                tileImages[i] = wfc.loadImage(imgData[i]);
            } else {
                const path = "tiles";
                tileImages[i] = wfc.loadImage(`${path}/${i}.png`);

            }

        }
    }

    // wfc.clear = () => {
    //     wfc.clearStorage();
    // }


    wfc.setup = () => {
        canvasDiv = wfc.createDiv();
        canvasDiv.position(10, 10);

        let para0 = wfc.createP('Digital Quilt Creator');
        para0.style("font-size", "24px");
        para0.style("color", "#555555");
        para0.parent(canvasDiv);

        canvas = wfc.createCanvas(300, 300);
        canvas.parent(canvasDiv);
        let para1 = wfc.createP('Choose colors by moving r, g, b sliders');
        para1.style("font-size", "20px");
        para1.position(10, 800);
        // let para2 = wfc.createP('.<br> Press clear storage to reset the tiles.');
        // para2.style("font-size", "20px");
        // para2.position(350, 50);
        // button = wfc.createButton('CLEAR STORAGE');
        // button.position(350, 250);
        // button.mousePressed(wfc.clear);

        // button1 = wfc.createButton("SHARE ARTWORK");
        // button1.position(350, 350);
        // button1.mousePressed(wfc.share);
        // button1.id('share');
        
        // Load and code the tiles
        tiles[0] = new Tile(tileImages[0], ["AAAA", "AABB", "ABAA", "AAAA"]);
        tiles[1] = new Tile(tileImages[1], ["AAAA", "AAAA", "AABB", "BBAA"]);
        tiles[2] = new Tile(tileImages[2], ["AAAA", "AAAA", "AAAA", "AAAA"]);
       
        
        for (let i = 0; i < 3; i++) {
            for (let j = 1; j < 4; j++) {
                tiles.push(tiles[i].rotate(j));
            }
        }

        // Generate the adjacency rules based on edges
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            tile.analyze(tiles);
        }

        wfc.startOver();
    }
    //}

    wfc.startOver = () => {
        // Create cell for each spot on the grid
        for (let i = 0; i < DIM * DIM; i++) {
            grid[i] = new Cell(tiles.length);
        }

    }

    wfc.checkValid = (arr, valid) => {
        //console.log(arr, valid);
        for (let i = arr.length - 1; i >= 0; i--) {
            // VALID: [BLANK, RIGHT]
            // ARR: [BLANK, UP, RIGHT, DOWN, LEFT]
            // result in removing UP, DOWN, LEFT
            let element = arr[i];
            // console.log(element, valid.includes(element));
            if (!valid.includes(element)) {
                arr.splice(i, 1);
            }
        }
        // console.log(arr);
        // console.log("----------");
    }

    wfc.mousePressed = () => {
        wfc.redraw();
    }

    wfc.draw = () => {
        wfc.background(0);

        const w = wfc.width / DIM;
        const h = wfc.height / DIM;
        for (let j = 0; j < DIM; j++) {
            for (let i = 0; i < DIM; i++) {
                let cell = grid[i + j * DIM];
                if (cell.collapsed) {
                    let index = cell.options[0];
                    wfc.image(tiles[index].img, i * w, j * h, w, h);
                } else {
                    wfc.fill(0);
                    wfc.stroke(255);
                    wfc.rect(i * w, j * h, w, h);
                }
            }
        }

        // Pick cell with least entropy
        let gridCopy = grid.slice();
        gridCopy = gridCopy.filter((a) => !a.collapsed);
        // console.table(grid);
        // console.table(gridCopy);

        if (gridCopy.length == 0) {
            return;
        }
        gridCopy.sort((a, b) => {
            return a.options.length - b.options.length;
        });

        let len = gridCopy[0].options.length;
        let stopIndex = 0;
        for (let i = 1; i < gridCopy.length; i++) {
            if (gridCopy[i].options.length > len) {
                stopIndex = i;
                break;
            }
        }

        if (stopIndex > 0) gridCopy.splice(stopIndex);
        const cell = wfc.random(gridCopy);
        cell.collapsed = true;
        const pick = wfc.random(cell.options);
        if (pick === undefined) {
            wfc.startOver();
            return;
        }
        cell.options = [pick];

        const nextGrid = [];
        for (let j = 0; j < DIM; j++) {
            for (let i = 0; i < DIM; i++) {
                let index = i + j * DIM;
                if (grid[index].collapsed) {
                    nextGrid[index] = grid[index];
                } else {
                    let options = new Array(tiles.length).fill(0).map((x, i) => i);
                    // Look up
                    if (j > 0) {
                        let up = grid[i + (j - 1) * DIM];
                        let validOptions = [];
                        for (let option of up.options) {
                            let valid = tiles[option].down;
                            validOptions = validOptions.concat(valid);
                        }
                        wfc.checkValid(options, validOptions);
                    }
                    // Look right
                    if (i < DIM - 1) {
                        let right = grid[i + 1 + j * DIM];
                        let validOptions = [];
                        for (let option of right.options) {
                            let valid = tiles[option].left;
                            validOptions = validOptions.concat(valid);
                        }
                        wfc.checkValid(options, validOptions);
                    }
                    // Look down
                    if (j < DIM - 1) {
                        let down = grid[i + (j + 1) * DIM];
                        let validOptions = [];
                        for (let option of down.options) {
                            let valid = tiles[option].up;
                            validOptions = validOptions.concat(valid);
                        }
                        wfc.checkValid(options, validOptions);
                    }
                    // Look left
                    if (i > 0) {
                        let left = grid[i - 1 + j * DIM];
                        let validOptions = [];
                        for (let option of left.options) {
                            let valid = tiles[option].right;
                            validOptions = validOptions.concat(valid);
                        }
                        wfc.checkValid(options, validOptions);
                    }

                    // I could immediately collapse if only one option left?
                    nextGrid[index] = new Cell(options);
                }
            }
        }

        grid = nextGrid;
    }

    wfc.reverseString = (s) => {
        let arr = s.split("");
        arr = arr.reverse();
        return arr.join("");
    }

    wfc.compareEdge = (a, b) => {
        return a == wfc.reverseString(b);
    }

    class Tile {
        constructor(img, edges) {
            this.img = img;
            this.edges = edges;
            this.up = [];
            this.right = [];
            this.down = [];
            this.left = [];
        }

        analyze(tiles) {
            for (let i = 0; i < tiles.length; i++) {
                let tile = tiles[i];
                // UP
                if (wfc.compareEdge(tile.edges[2], this.edges[0])) {
                    this.up.push(i);
                }
                // RIGHT
                if (wfc.compareEdge(tile.edges[3], this.edges[1])) {
                    this.right.push(i);
                }
                // DOWN
                if (wfc.compareEdge(tile.edges[0], this.edges[2])) {
                    this.down.push(i);
                }
                // LEFT
                if (wfc.compareEdge(tile.edges[1], this.edges[3])) {
                    this.left.push(i);
                }
            }
        }

        rotate(num) {
            const w = this.img.width;
            const h = this.img.height;
            const newImg = wfc.createGraphics(w, h);
            newImg.imageMode(wfc.CENTER);
            newImg.translate(w / 2, h / 2);
            newImg.rotate(wfc.HALF_PI * num);
            newImg.image(this.img, 0, 0);

            const newEdges = [];
            const len = this.edges.length;
            for (let i = 0; i < len; i++) {
                newEdges[i] = this.edges[(i - num + len) % len];
            }
            return new Tile(newImg, newEdges);
        }
    }

    class Cell {
        constructor(value) {
            this.collapsed = false;
            if (value instanceof Array) {
                this.options = value;
            } else {
                this.options = [];
                for (let i = 0; i < value; i++) {
                    this.options[i] = i;
                }
            }
        }
    }

});

