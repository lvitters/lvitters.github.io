var ht = 0;
var h2t = 0;
var st = 0;
var bt = 0;

var xPos;
var yPos;

var rt = 0;
var r2t = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100);
	background(0);
	
	xPos = random(windowWidth);
	yPos = random(windowHeight);
}

function draw() {
	frameRate(60);
	noStroke();
	rectMode(CENTER);
	
	translate(windowWidth/2, windowHeight/2);
	
	var h = map(noise(ht) * 360, 0, 360, -20, 380);
	var s = map(noise(st) * 100, 0, 100, 20, 110);
	var b = map(noise(bt) * 100, 0, 100, 50, 110);
	
	var c = color(h, s, b);
	fill(c);
	rotate(rt);
	rect(noise(xPos) * windowWidth/2, windowHeight/2, random(windowHeight/16), windowHeight * 3);
	
	c = color(h2t, s, b);
	fill(c);
	rotate(-r2t);
	rect(-windowWidth/2, noise(yPos) * windowHeight/2, windowWidth * 3, random(windowHeight/16));
	
	ht = ht + random(0.005, 0.01);
	h2t = h2t + random(0.005, 0.01);
	st = st + random(0.02, 0.03);
	bt = bt + random(0.02, 0.03);
	
	xPos = xPos + random(0.001, 0.002);
	yPos = yPos + random(0.001, 0.002);
	
	rt = rt + random(0.005, 0.01);
	r2t = r2t + random(0.01, 0.02);
}