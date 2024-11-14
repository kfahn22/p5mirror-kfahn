// From Dave Paguret's interesting line tutorial
// https://openprocessing.org/sketch/1875216/

const strokes = []

function setup() {
	createCanvas(600, 600)
}

function mousePressed() {
	// Start a new stroke
	const stroke = []
	
	// Begin at the mouse position
	stroke.push(createVector(mouseX, mouseY))
	strokes.push(stroke)
}

function mouseDragged() {
	// Add a new point to the latest stroke
	const stroke = strokes[strokes.length - 1]
	
	// Instead of directly adding the mouse coordinate,
	// move from the last point *toward* the mouse, but
	// not quite getting there. This smooths the line
	const targetPt = createVector(mouseX, mouseY)
	const lastPt = stroke[stroke.length-1]
	// This moves 10% of the way to the mouse. Try other values here
	// for different amounts of smoothing
	stroke.push(lastPt.copy().lerp(targetPt, 0.1))
}

function draw() {
	background(255)
	stroke(0)
	strokeWeight(10)
	
	// Loop over all strokes
	for (const stroke of strokes) {
		// Got to have at least two points to connect into a line!
		if (stroke.length < 2) continue
		
		// Connect the dots
		beginShape()
		for (const pt of stroke) {
			vertex(pt.x, pt.y)
		}
		endShape()
	}
}