// UMAP instance
let umap;
// Boolean to check if UMAP is currently processing
let isUMAPRunning = true;
// Variable to hold color data from JSON
let json, embeddings;

function preload() {
   json = loadJSON(
    "https://raw.githubusercontent.com/Programming-from-A-to-Z/Save-Embeddings-JSON/main/p5-embeddings.json"
   );
}

function setup() {
  // Set up the canvas
  createCanvas(windowWidth, windowHeight);
  embeddings = json.embeddings;
  let data = [];
  // Iterate through the embeddings JSON and store everything in a data array
  for (let i = 0; i < embeddings.length; i++) {
    data.push(embeddings[i].embedding);
  }

  // Initialize UMAP with specified parameters
  umap = new UMAP({ nNeighbors: 15, minDist: 0.1, nComponents: 2 });
  // Start fitting the UMAP model with the color data
  umap.initializeFit(data);
}

function draw() {
  // Check if UMAP is still running
  if (isUMAPRunning) {
    // Perform a single UMAP iteration
    let result = umap.step();
    isUMAPRunning = result; // Continue running UMAP until it's done

    // Clear the canvas
    background(255);
    noStroke();

    // Draw the current state of the UMAP results
    let reducedEmbeddings = umap.getEmbedding();
    let [maxW, minW, maxH, minH] = mapUMAPToPixelSpace(reducedEmbeddings);

    for (let i = 0; i < reducedEmbeddings.length; i++) {
      let data2D = reducedEmbeddings[i];
      // Set the fill color based on the original data
      fill(0);
      // Map the 2D UMAP output to canvas coordinates
      let x = map(data2D[0], minW, maxW, 0, width);
      let y = map(data2D[1], minH, maxH, 0, height);
      // Draw a circle for each data point
      // circle(x, y, 10);
      textSize(12);
      fill(0);
      noStroke();
      text(embeddings[i].text, x, y);
    }
  }
}

// Function to map UMAP results to pixel space for visualization
function mapUMAPToPixelSpace(umapResults) {
  // Initialize variables to track the maximum and minimum values in width and height
  let maxW = 0;
  let minW = Infinity;
  let maxH = 0;
  let minH = Infinity;

  // Iterate over each UMAP result to find the extreme values
  for (let i = 0; i < umapResults.length; i++) {
    // Update maxW and minW with the maximum and minimum x-coordinates
    maxW = Math.max(maxW, umapResults[i][0]);
    minW = Math.min(minW, umapResults[i][0]);

    // Update maxH and minH with the maximum and minimum y-coordinates
    maxH = Math.max(maxH, umapResults[i][1]);
    minH = Math.min(minH, umapResults[i][1]);
  }

  // Return the extreme values which define the bounding box for UMAP results
  return [maxW, minW, maxH, minH];
}
