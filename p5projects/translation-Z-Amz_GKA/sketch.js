// These sketches generate tiles and then runs the wave function collapse algorithm.
// The wfc algorithm code is based on the Wave Function Collapse challenge by Dan Shiffman
// https://www.youtube.com/watch?v=QvoTSl60Y88
// The idea for storing the tiles in local storage is based on the th Local Storage tutorial by Dan Shiffman
// https://www.youtube.com/watch?v=_SRS8b4LcZ8

new p5(sa => {

    // a shader variable
    let shader0;

    // Declare variables
    let radio1;

    let button0;
    let button1;
    let c0;
    let graphics0;
    
    sa.clear = () => {
        sa.clearStorage();
    }

    sa.preload = () => {
        // load the the shader
        shader0 = sa.loadShader('translate.vert', 'translate.frag');
    }

    sa.setup = () => {
        sa.pixelDensity(1);
        sa.noStroke();

        let divA = sa.createDiv();
        divA.position(450, 450);
        divA.style('max-width', '200px');
        divA.style('align-content', 'center');

        c0 = sa.createCanvas(200, 200, sa.WEBGL);
        c0.parent(divA);
        sa.pixelDensity(1);
        // shaders require WEBGL mode to work
        graphics0 = sa.createGraphics(200, 200, sa.WEBGL);

        button0 = sa.createButton('SAVE TILE A');
        button0.position(150, 325);
        button0.mousePressed(sa.saveTile0);

        r1Slider = sa.createSlider(0, 255, 0);
        g1Slider = sa.createSlider(0, 255, 0);
        b1Slider = sa.createSlider(0, 255, 0);
        r2Slider = sa.createSlider(0, 255, 255);
        g2Slider = sa.createSlider(0, 255, 255);
        b2Slider = sa.createSlider(0, 255, 255);
        r3Slider = sa.createSlider(0, 255, 125);
        g3Slider = sa.createSlider(0, 255, 125);
        b3Slider = sa.createSlider(0, 255, 125);
        rad1Slider = sa.createSlider(0, 100, 50, 1);
        rad2Slider = sa.createSlider(0, 100, 25, 1);
        x1Slider = sa.createSlider(0, 300, 200, 1);
        y1Slider = sa.createSlider(0, 300, 100, 1);
        x2Slider = sa.createSlider(0, 300, 25, 1);
        y2Slider = sa.createSlider(0, 300, 10, 1);

        let colors = sa.getItem("colors");
        if (colors !== null) {
            r1Slider.value(colors.r1);
            g1Slider.value(colors.g1);
            b1Slider.value(colors.b1);
            r2Slider.value(colors.r2);
            g2Slider.value(colors.g2);
            b2Slider.value(colors.b2);
            r3Slider.value(colors.r3);
            g3Slider.value(colors.g3);
            b3Slider.value(colors.b3);
        }
        r1Slider.changed(sa.storeColors);
        g1Slider.changed(sa.storeColors);
        b1Slider.changed(sa.storeColors);
        r2Slider.changed(sa.storeColors);
        g2Slider.changed(sa.storeColors);
        b2Slider.changed(sa.storeColors);
        r3Slider.changed(sa.storeColors);
        g3Slider.changed(sa.storeColors);
        b3Slider.changed(sa.storeColors);

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

        // Organize the layout
        let div1 = sa.createDiv();
        div1.style('font-size', '16px');
        div1.position(10, 425);
        colAlabel = sa.createP('Color A');
        colAlabel.parent(div1);
        colAlabel.style("color", "#fff");
        r1Slider.parent(div1);
        g1Slider.parent(div1);
        b1Slider.parent(div1);

        let div2 = sa.createDiv();
        div2.style('font-size', '16px');
        div2.position(10, 525);
        colBlabel = sa.createP('Color B');
        colBlabel.parent(div2);
        colBlabel.style("color", "#fff");
        r2Slider.parent(div2);
        g2Slider.parent(div2);
        b2Slider.parent(div2);

        let div3 = sa.createDiv();
        div3.style('font-size', '16px');
        div3.position(10, 625);
        colClabel = sa.createP('Color C');
        colClabel.parent(div3);
        colClabel.style("color", "#fff");
        r3Slider.parent(div3);
        g3Slider.parent(div3);
        b3Slider.parent(div3);  

        let div8a = sa.createDiv();
        div8a.style('font-size', '16px');
        div8a.position(450, 10);
        rad1label = sa.createP('Radius 1');
        rad1label.parent(div8a);
        rad1label.style("color", "#fff");
        rad1Slider.style("width", "180px");
        rad1Slider.parent(div8a);

        let div3a = sa.createDiv();
        div3a.style('font-size', '16px');
        div3a.position(450, 70);
        rad2label = sa.createP('Radius 2');
        rad2label.parent(div3a);
        rad2label.style("color", "#fff");
        rad2Slider.style("width", "180px");
        rad2Slider.parent(div3a);

        let div4a = sa.createDiv();
        div4a.style('font-size', '16px');
        div4a.position(450, 135);
        x1label = sa.createP('X1 offset');
        x1label.parent(div4a);
        x1label.style("color", "#fff");
        x1Slider.parent(div4a);
        x1Slider.style("width", "180px");

        let div5a = sa.createDiv();
        div5a.style('font-size', '16px');
        div5a.position(450, 195);
        y1label = sa.createP('Y1 offset');
        y1label.parent(div5a);
        y1label.style("color", "#fff");
        y1Slider.parent(div5a);
        y1Slider.style("width", "180px");

        let div6a = sa.createDiv();
        div6a.style('font-size', '16px');
        div6a.position(450, 255);
        x2label = sa.createP('X2 offset');
        x2label.parent(div6a);
        x2label.style("color", "#fff");
        x2Slider.parent(div6a);
        x2Slider.style("width", "180px");

        let div7a = sa.createDiv();
        div7a.style('font-size', '16px');
        div7a.position(450, 315);
        y2label = sa.createP('Y2 offset');
        y2label.parent(div7a);
        y2label.style("color", "#fff");
        y2Slider.parent(div7a);
        y2Slider.style("width", "180px");

    }

    sa.draw = () => {
        let r1 = r1Slider.value();
        let g1 = g1Slider.value();
        let b1 = b1Slider.value();
        let r2 = r2Slider.value();
        let g2 = g2Slider.value();
        let b2 = b2Slider.value();
        let r3 = r3Slider.value();
        let g3 = g3Slider.value();
        let b3 = b3Slider.value();

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

        shader0.setUniform('u_resolution', [sa.width, sa.height]);
        shader0.setUniform('colorAr', r1);
        shader0.setUniform('colorAg', g1);
        shader0.setUniform('colorAb', b1);
        shader0.setUniform('colorBr', r2);
        shader0.setUniform('colorBg', g2);
        shader0.setUniform('colorBb', b2);
        shader0.setUniform('colorCr', r3);
        shader0.setUniform('colorCg', g3);
        shader0.setUniform('colorCb', b3);
        shader0.setUniform('rad1', newrad1);
        shader0.setUniform('rad2', newrad2);
        shader0.setUniform('offset1', [x1Offset, y1Offset]);
        shader0.setUniform('offset2', [x2Offset, y2Offset]);
        shader0.setUniform('tileChoice', 0.0);
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
            r3: r3Slider.value(),
            g3: g3Slider.value(),
            b3: b3Slider.value(),
        }

        sa.storeItem("colors", colors);
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

    sa.saveTile0 = () => {
        sa.saveCanvas(c0, '0.png');
        sa.storeItem("img0", c0.elt.toDataURL());
    }

});

new p5(sb => {
    // a shader variable
    let shader1;
    let button1;
    let c1;
    let graphics1;

    sb.preload = () => {
        // load the the shader
        shader1 = sb.loadShader('translate.vert', 'translate.frag');
    }

    sb.setup = () => {
        sb.pixelDensity(1);
        sb.noStroke();
        // shaders require WEBGL mode to work

        let divB = sb.createDiv();
        divB.position(652, 450);
        divB.style('max-width', '100px');
        c1 = sb.createCanvas(200, 200, sb.WEBGL);
        c1.parent(divB);
        sb.pixelDensity(1);
        graphics1 = sb.createGraphics(100, 100, sb.WEBGL);

        button1 = sb.createButton('SAVE TILE B');
        button1.mousePressed(sb.saveTile1);
        button1.position(250, 325);

        let colors = sb.getItem("colors");
        if (colors !== null) {
            r1Slider.value(colors.r1);
            g1Slider.value(colors.g1);
            b1Slider.value(colors.b1);
            r2Slider.value(colors.r2);
            g2Slider.value(colors.g2);
            b2Slider.value(colors.b2);
            r3Slider.value(colors.r3);
            g3Slider.value(colors.g3);
            b3Slider.value(colors.b3);
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
     
    }

    sb.draw = () => {
        let r1 = r1Slider.value();
        let g1 = g1Slider.value();
        let b1 = b1Slider.value();
        let r2 = r2Slider.value();
        let g2 = g2Slider.value();
        let b2 = b2Slider.value();
        let r3 = r3Slider.value();
        let g3 = g3Slider.value();
        let b3 = b3Slider.value();
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

        shader1.setUniform('u_resolution', [sb.width, sb.height]);
        shader1.setUniform('colorAr', r1);
        shader1.setUniform('colorAg', g1);
        shader1.setUniform('colorAb', b1);
        shader1.setUniform('colorBr', r2);
        shader1.setUniform('colorBg', g2);
        shader1.setUniform('colorBb', b2);
        shader1.setUniform('colorCr', r3);
        shader1.setUniform('colorCg', g3);
        shader1.setUniform('colorCb', b3);
        shader1.setUniform('tileChoice', 1.0);
        shader1.setUniform('rad1', newrad1);
        shader1.setUniform('rad2', newrad2);
        shader1.setUniform('offset1', [x1Offset, y1Offset]);
        shader1.setUniform('offset2', [x2Offset, y2Offset]);

        sb.shader(shader1);
        sb.rect(0, 0, sb.width, sb.height)
    }


    sb.saveTile1 = () => {
        sb.storeItem("img1", c1.elt.toDataURL());
    }
});

new p5(sc => {
    // a shader variable
    let shader2;
    let button2;
    let c2;
    let graphics2;

    sc.preload = () => {
        // load the the shader
        shader2 = sc.loadShader('translate.vert', 'translate.frag');
    }

    sc.setup = () => {
        sc.pixelDensity(1);
        sc.noStroke();
        // shaders require WEBGL mode to work

        let divC = sc.createDiv();
        divC.position(450, 652);
        divC.style('max-width', '200px');
        c2 = sc.createCanvas(200, 200, sc.WEBGL);
        c2.parent(divC);
        sc.pixelDensity(1);
        graphics2 = sc.createGraphics(200, 200, sc.WEBGL);

        button2 = sc.createButton('SAVE TILE C');
        button2.mousePressed(sc.saveTile2);
        button2.position(150, 370);

        let colors = sc.getItem("colors");
        if (colors !== null) {
            r1Slider.value(colors.r1);
            g1Slider.value(colors.g1);
            b1Slider.value(colors.b1);
            r2Slider.value(colors.r2);
            g2Slider.value(colors.g2);
            b2Slider.value(colors.b2);
            r3Slider.value(colors.r3);
            g3Slider.value(colors.g3);
            b3Slider.value(colors.b3);
        }
        let parameters = sc.getItem("parameters");
        if (parameters !== null) {
            rad1Slider.value(parameters.rad1);
            rad2Slider.value(parameters.rad2);
            x1Slider.value(parameters.x1);
            y1Slider.value(parameters.y1);
            x2Slider.value(parameters.x2);
            y2Slider.value(parameters.y2);
        }
       
    }

    sc.draw = () => {
        let r1 = r1Slider.value();
        let g1 = g1Slider.value();
        let b1 = b1Slider.value();
        let r2 = r2Slider.value();
        let g2 = g2Slider.value();
        let b2 = b2Slider.value();
        let r3 = r3Slider.value();
        let g3 = g3Slider.value();
        let b3 = b3Slider.value();
        let rad1 = rad1Slider.value();  
        let newrad1 = sc.map(rad1, 0, 100, 0.0, 1.0);
        let rad2 = rad2Slider.value();  
        let newrad2 = sc.map(rad2, 0, 100, 0.0, 1.0);
        let x1 = x1Slider.value();
        let x1Offset = sc.map(x1, 0, 300, -1.5, 1.5);
        let y1 = y1Slider.value();
        let y1Offset = sc.map(y1, 0, 300, -0.5, 2.5);
        let x2 = x2Slider.value();
        let x2Offset = sc.map(x2, 0, 100, -0.25, 0.25);
        let y2 = y2Slider.value();
        let y2Offset = sc.map(y2, 0, 100, -0.25, 0.25);

        shader2.setUniform('u_resolution', [sc.width, sc.height]);
        shader2.setUniform('colorAr', r1);
        shader2.setUniform('colorAg', g1);
        shader2.setUniform('colorAb', b1);
        shader2.setUniform('colorBr', r2);
        shader2.setUniform('colorBg', g2);
        shader2.setUniform('colorBb', b2);
        shader2.setUniform('colorCr', r3);
        shader2.setUniform('colorCg', g3);
        shader2.setUniform('colorCb', b3);
        shader2.setUniform('rad1', newrad1);
        shader2.setUniform('rad2', newrad2);
        shader2.setUniform('offset1', [x1Offset, y1Offset]);
        shader2.setUniform('offset2', [x2Offset, y2Offset]);
        shader2.setUniform('tileChoice', 2.0);
        sc.shader(shader2);
        sc.rect(0, 0, sc.width, sc.height)
    }

    sc.saveTile2 = () => {
        sc.storeItem("img2", c2.elt.toDataURL());
    }
});

new p5(sd => {
    // a shader variable
    let shader3;
    let button3;
    let c3;
    let graphics3;

    sd.preload = () => {
        // load the the shader
        shader3 = sd.loadShader('translate.vert', 'translate.frag');
    }

    sd.setup = () => {
        sd.pixelDensity(1);
        sd.noStroke();
        // shaders require WEBGL mode to work

        let divD = sd.createDiv();
        divD.position(652, 652);
        divD.style('max-width', '200px');
        c3 = sd.createCanvas(200, 200, sd.WEBGL);
        c3.parent(divD);
        sd.pixelDensity(1);
        graphics3 = sd.createGraphics(200, 200, sd.WEBGL);

        button3 = sd.createButton('SAVE TILE D');
        button3.mousePressed(sd.saveTile3);
        button3.position(250, 370);

        let colors = sd.getItem("colors");
        if (colors !== null) {
            r1Slider.value(colors.r1);
            g1Slider.value(colors.g1);
            b1Slider.value(colors.b1);
            r2Slider.value(colors.r2);
            g2Slider.value(colors.g2);
            b2Slider.value(colors.b2);
            r3Slider.value(colors.r3);
            g3Slider.value(colors.g3);
            b3Slider.value(colors.b3);
        }
        let parameters = sd.getItem("parameters");
        if (parameters !== null) {
            rad1Slider.value(parameters.rad1);
            rad2Slider.value(parameters.rad2);
            x1Slider.value(parameters.x1);
            y1Slider.value(parameters.y1);
            x2Slider.value(parameters.x2);
            y2Slider.value(parameters.y2);
        }

    }

    sd.draw = () => {
        let r1 = r1Slider.value();
        let g1 = g1Slider.value();
        let b1 = b1Slider.value();
        let r2 = r2Slider.value();
        let g2 = g2Slider.value();
        let b2 = b2Slider.value();
        let r3 = r3Slider.value();
        let g3 = g3Slider.value();
        let b3 = b3Slider.value();
        let rad1 = rad1Slider.value();  
        let newrad1 = sd.map(rad1, 0, 100, 0.0, 1.0);
        let rad2 = rad2Slider.value();  
        let newrad2 = sd.map(rad2, 0, 100, 0.0, 1.0);
        let x1 = x1Slider.value();
        let x1Offset = sd.map(x1, 0, 300, -2.5, 0.5);
        let y1 = y1Slider.value();
        let y1Offset = sd.map(y1, 0, 300, -0.5, 2.5);
        let x2 = x2Slider.value();
        let x2Offset = sd.map(x2, 0, 100, -0.25, 0.25);
        let y2 = y2Slider.value();
        let y2Offset = sd.map(y2, 0, 100, -0.25, 0.25);

        shader3.setUniform('u_resolution', [sd.width, sd.height]);
        shader3.setUniform('colorAr', r1);
        shader3.setUniform('colorAg', g1);
        shader3.setUniform('colorAb', b1);
        shader3.setUniform('colorBr', r2);
        shader3.setUniform('colorBg', g2);
        shader3.setUniform('colorBb', b2);
        shader3.setUniform('colorCr', r3);
        shader3.setUniform('colorCg', g3);
        shader3.setUniform('colorCb', b3);
        shader3.setUniform('tileChoice', 3.0);
        shader3.setUniform('rad1', newrad1);
        shader3.setUniform('rad2', newrad2);
        shader3.setUniform('offset1', [x1Offset, y1Offset]);
        shader3.setUniform('offset2', [x2Offset, y2Offset]);
        sd.shader(shader3);
        sd.rect(0, 0, sd.width, sd.height)
    }

    sd.saveTile3 = () => {
        sd.storeItem("img3", c3.elt.toDataURL());
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
        for (let i = 0; i < 4; i++) {
            imgData[i] = wfc.getItem(`img${i}`);
            if (imgData[i] !== null) {
                tileImages[i] = wfc.loadImage(imgData[i]);
            } //else {
                // const path = "tiles";
                // tileImages[i] = wfc.loadImage(`${path}/${i}.png`);

            //}

        }
    }

    wfc.clear = () => {
        wfc.clearStorage();
    }

    wfc.setup = () => {
        canvasDiv = wfc.createDiv();
        canvasDiv.position(10, 10);

        // let para0 = wfc.createP('WFC with Local Storage');
        // para0.style("font-size", "24px");
        // para0.style("color", "#555555");
        // para0.parent(canvasDiv);

        canvas = wfc.createCanvas(300, 300);
        canvas.parent(canvasDiv);
        let para1 = wfc.createP('Choose colors by moving r, g, b sliders');
        para1.style("font-size", "20px");
        para1.style("color", "#fff");
        para1.position(10, 390);
        // let para2 = wfc.createP('Press refresh to rerun the WFC algorithm or clear the color choices.<br> Press clear storage to reset the tiles.');
        // para2.style("font-size", "20px");
        // para2.style("color", "#555555");
        // para2.position(350, 50);
        button = wfc.createButton('CLEAR STORAGE');
        button.position(10, 325);
        button.mousePressed(wfc.clear);

        // Load and code the tiles
        tiles[0] = new Tile(tileImages[0], ["A", "B", "C", "A"]);
        tiles[1] = new Tile(tileImages[1], ["A", "A", "D", "B"]);
        tiles[2] = new Tile(tileImages[2], ["C", "E", "A", "A"]);
        tiles[3] = new Tile(tileImages[3], ["D", "A", "A", "E"]);

        for (let i = 0; i < 4; i++) {
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