// Coding Train, Live Stream 12/4/2023
// https://youtu.be/1mwguqeEz8c


// Allocate a pipeline for sentiment-analysis
let pipe = await pipeline('sentiment-analysis');

let out = await pipe('I love transformers!');
// [{'label': 'POSITIVE', 'score': 0.999817686}]
// Array to store raw embeddings data
let rawEmbeddings = [];
// UMAP instance
let umap;
// Counter for UMAP iterations
let iterations = 0;
// Total number of epochs for UMAP processing
let nEpochs = 1;
// Variable to store loaded JSON data
let jsonData;

function preload() {
  // Load JSON data from a URL
  jsonData = loadJSON('https://raw.githubusercontent.com/CodingTrain/Embeddings-Live/main/tv-embeddings.json');
}

function setup() {
  // Set up the canvas
  //createCanvas(windowWidth, windowHeight);
  createCanvas(800, 400, WEBGL);

  // Extract embeddings from JSON data and add to the rawEmbeddings array
  for (let i = 0; i < jsonData.embeddings.length; i++) {
    rawEmbeddings.push(jsonData.embeddings[i].embedding);
  }
  console.log(rawEmbeddings);

  // UMAP configuration options
  const options = {
    nNeighbors: 15,
    minDist: 0.1,
    nComponents: 3,
    nEpochs,
  };
  // Initialize UMAP with options and data
  umap = new UMAP(options);
  umap.initializeFit(rawEmbeddings);
}

function draw() {
  // Set background color
  background(0);

  // Run UMAP iterations
  if (iterations < nEpochs) {
    iterations = umap.step();
  }

  // Get the current UMAP results
  let umapResults = umap.getEmbedding();

  // Variables to store the min and max values for mapping
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  // Calculate the min and max values for x and y
  for (let i = 0; i < umapResults.length; i++) {
    let dataPoint = umapResults[i];
    minX = min(dataPoint[0], minX);
    minY = min(dataPoint[1], minY);
    maxX = max(dataPoint[0], maxX);
    maxY = max(dataPoint[1], maxY);
  }

  // Draw the UMAP results on the canvas
  for (let i = 0; i < umapResults.length; i++) {
    let dataPoint = umapResults[i];
    // Map the UMAP output to canvas coordinates
    let x = map(dataPoint[0], minX, maxX, 0, width);
    let y = map(dataPoint[1], minY, maxY, 0, height);
    noStroke();
    fill(255);
    // Display the text from the JSON data at the mapped coordinates
    loadFont();
    text(jsonData.embeddings[i].show, x, y);
  }
}
