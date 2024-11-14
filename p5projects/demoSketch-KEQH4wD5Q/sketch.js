// These sketches generate tiles and then runs the wave function collapse algorithm.
// The code is based on the Wave Function Collapse challenge by Dan Shiffman and 
// Local Storage by Dan Shiffman
// The tile generation code uses shaders and is my own but incorporates SDF functions // from Inigo Quilez


new p5(tg => { // This sketch generates train track tiles that can be used with the wave function collapse algorithm
    // Colors can be personalized by changing the color values in the frag files

    let tile = [];
    let canvas;
    let firstBuffer;
    let secondBuffer;
    let button0;
    let button1;
    let button2;
    let num = 2;
    let c1 = tg.color(255, 0, 0);
    let c2 = tg.color(0, 255, 0);

    tg.setup = () => {
        canvas = tg.createCanvas(200, 100);
        tg.pixelDensity(1);
        firstBuffer = tg.createGraphics(100, 100);
        secondBuffer = tg.createGraphics(100, 100);

        div1 = tg.createDiv();
        //div1.class('flex-container');
        div1.position(10, 600);

        button0 = tg.createButton('save tile0');
        button0.parent(div1);
        button0.mousePressed(tg.saveTile0);
        button1 = tg.createButton('save tile1');
        button1.parent(div1);
        button1.mousePressed(tg.saveTile1);
        button2 = tg.createButton('clear storage');
        button2.parent(div1);
        button2.mousePressed(tg.clear);
        div1.style('display', "inline-block");
        div1.style('margin', '2vw');

        div1.style('align-content', 'space-around');

        // for (let i = 0; i < num; i++) {
        //     tile[i] = new createTile(c1, c2);
        // }
    }
    tg.draw = () => {
        tg.drawFirstbuffer();
        tg.drawSecondbuffer();
        tg.image(firstBuffer, 0, 0);
        tg.image(secondBuffer, 100, 0)
    }

    tg.drawFirstbuffer = () => {
        firstBuffer.background(0, 125, 125);
        firstBuffer.fill(0, 0, 255);
    }

    tg.drawSecondbuffer = () => {
        secondBuffer.background(0, 125, 125);
        secondBuffer.noStroke();
        secondBuffer.fill(0, 255, 255);
        secondBuffer.circle(50, 0, 30);
        secondBuffer.circle(100, 50, 30);
        secondBuffer.circle(50, 100, 30);
    }

    tg.saveTile0 = () => {
        tg.storeItem("img0", firstBuffer.elt.toDataURL());
    }
    tg.saveTile1 = () => {
        tg.storeItem("img1", secondBuffer.elt.toDataURL());
    }
    
    tg.clear = () => {
        tg.clearStorage();
    }

    // tg.mousePressed = () => {
    //   saveFrames('uv', 'png', 1, 1);
    // }
});

new p5(wfc => {

    const imgData = [];
    const tiles = [];
    const tileImages = [];

    let grid = [];

    const DIM = 10;
    let graphics;

    wfc.preload = () => {
        for (let i = 0; i < 2; i++) {
            imgData[i] = wfc.getItem(`img${i}`);
            if (imgData[i] !== null) {
                tileImages[i] = wfc.loadImage(imgData[i]);
            } else {
                const path = "grey_tracks";
                tileImages[i] = wfc.loadImage(`${path}/${i}.png`);
                console.log(tileImages[0]);
            }
        }
    }

    wfc.setup = () => {
        wfc.createCanvas(300, 300);

        
        // Load and code the tiles
        tiles[0] = new Tile(tileImages[0], ["AAA", "AAA", "AAA", "AAA"]);
        tiles[1] = new Tile(tileImages[1], ["ABA", "ABA", "ABA", "AAA"]);
            
        for (let i = 0; i < 2; i++) {
            for (let j = 1; j < 4; j++) {
                tiles.push(tiles[i].rotate(j));
                console.log(tileImages[1]);
            }
        }
        // Generate the adjacency rules based on edges
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            tile.analyze(tiles);
        }

        wfc.startOver();
    }

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
            console.log('aargh!!');
            console.log(newImg);
            const newEdges = [];
            const len = this.edges.length;
            for (let i = 0; i < len; i++) {
                newEdges[i] = this.edges[(i - num + len) % len];
            }
            return new Tile(newImg, newEdges);
        }
    }



 });