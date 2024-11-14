// Code for line from DAve Pagurek
// https://openprocessing.org/sketch/1875216/

const strokes = []
let strokeShader;

function preload() {
  strokeShader = loadShader("line.vert", "line.frag")
}
function setup() {
	// Fix seams between segments by using WEBGL, which draws all
	// segments at once without antialiasing individually
	createCanvas(windowWidth, windowHeight, WEBGL)
	setAttributes({ antialias: true })
	
	// Create a shader
	//strokeShader = createShader(vert, frag)
}

function mousePressed() {
	// Start a new stroke
	const stroke = []
	
	// Begin at the mouse position with an initial thickness
	stroke.push({
		pt: createVector(mouseX, mouseY),
		thickness: 4
	})
	strokes.push(stroke)
}

function mouseDragged() {
	angleMode(RADIANS)
	
	// Add a new point to the latest stroke
	const stroke = strokes[strokes.length - 1]
	
	// Instead of directly adding the mouse coordinate,
	// move from the last point *toward* the mouse, but
	// not quite getting there. This smooths the line
	const targetPt = createVector(mouseX, mouseY)
	const lastPt = stroke[stroke.length-1].pt
	
	// This moves 10% of the way to the mouse. Try other values here
	// for different amounts of smoothing
	const pt = lastPt.copy().lerp(targetPt, 0.1)
	
	// Do the same for thickness
	const targetThickness = createVector(pmouseX, pmouseY).dist(targetPt)
	const lastThickness = stroke[stroke.length-1].thickness
	const thickness = lerp(lastThickness, targetThickness, 0.1)
	
	stroke.push({ pt, thickness })
}

function draw() {
	// Put the origin back to the top left
	translate(-width/2, -height/2)
	
	background(255)
	noStroke()
	
	angleMode(DEGREES)
	// Make texture coordinates go from 0-1 instead of 0-w, 0-h
	// so it's easier to swap out images without changing all
	// the coordinates
	textureMode(NORMAL)
	
	// Use our shader to texture the shape
	shader(strokeShader)
	
	// Loop over all strokes
	for (const stroke of strokes) {
		// Got to have at least two points to connect into a line!
		if (stroke.length < 2) continue
		
		// Calculate the direction to expand each stroke in
		const tangents = []
		for (let i = 1; i < stroke.length; i++) {
			const prev = stroke[i-1]
			const next = stroke[i]
			tangents.push(next.pt.copy().sub(prev.pt).normalize())
		}
		
		// We want a direction for each stroke but we have strokes.length-1
		// *differences* between strokes, so we just duplicate the last one
		tangents.push(tangents[tangents.length-1].copy())
		
		// Rotate the tangent directions to point directly out
		const normals = tangents.map((tangent) => tangent.copy().rotate(90))
		
		// Draw the outline of the shape
		beginShape(TRIANGLE_STRIP)
		for (const [i, { pt, thickness }] of stroke.entries()) {
			const n = normals[i]
			
			// Change the fill color per vertex to have it smoothly blend
			// over the stroke! Here I'm making the opacity be based on
			// the thickness
			fill(0, map(thickness, 8, 17, 50, 255, true))
			
			// Loop over inside and outside of the curve
			for (const side of [-1, 1]) {
				vertex(
					pt.x + side * n.x * thickness / 2, // x
					pt.y + side * n.y * thickness / 2, // y
					0, // z
					map(side, -1, 1, 0, 1), // Texture x coordinate on the image, from 0-1
					i // Texture y coordinate on the image, from 0-1
				)
			}
		}
		endShape()
	}
}