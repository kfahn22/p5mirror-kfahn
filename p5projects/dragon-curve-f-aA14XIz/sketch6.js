// https://openprocessing.org/sketch/700114

let ax = 0, ay = 0;
let bx = 0, by = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 255);
	background(0);
	
	ax = windowWidth / 3;
	ay = windowHeight / 3;
}

function draw() {
	background(0, 0, 0, 50);
	
	bx = mouseX;
	by = mouseY;
	
	dragonCurve(ax, ay, bx, by, parseInt((mouseX / windowWidth) * 14));
}

function dragonCurve(x1, y1, x2, y2, n) {
	let dx = x2 - x1;
	let dy = - (y2 - y1);
	
	let x3 = x1 + (dx + dy) / 2;
	let y3 = y2 + (dx + dy) / 2;
	
	if (n < 1) {
		stroke((x1 * 255) / windowWidth, 255, 255)
		line(x1, y1, x3, y3);
		line(x2, y2, x3, y3);
	}
	else {
		dragonCurve(x1, y1, x3, y3, n-1);
		dragonCurve(x2, y2, x3, y3, n-1);
	}
}