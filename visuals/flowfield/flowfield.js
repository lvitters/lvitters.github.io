var c;

var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100);
	
	c =  color(360, 100, 60);
	
	cols = floor(width / scl);
	rows = floor(height / scl);
	fr = createP('');

	flowfield = new Array(cols * rows);

	for (var i = 0; i < 1000; i++) {
    	particles[i] = new Particle();
	}
}

function draw() {
	frameRate(60);
	//background(0);
	
	var yoff = 0;
	  
	for (var y = 0; y < rows; y++) {
	  var xoff = 0;
	  for (var x = 0; x < cols; x++) {
	    var index = x + y * cols;
	    var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
	    var v = p5.Vector.fromAngle(angle);
	    v.setMag(1);
	    flowfield[index] = v;
	    xoff += inc;
	    stroke(0, 50);
	    // push();
	    // translate(x * scl, y * scl);
	    // rotate(v.heading());
	    // strokeWeight(1);
	    // line(0, 0, scl, 0);
	    // pop();
	  }
	  yoff += inc;
	  zoff += 0.0003;
	}
	for (var i = 0; i < particles.length; i++) {
	  particles[i].follow(flowfield);
	  particles[i].update();
	  particles[i].edges();
	  particles[i].show();
	}
}


   
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 2;
  this.h = 0;
  this.t = 0;
  this.t2 = 0;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };

  this.applyForce = function(force) {
    this.acc.add(force);
  };

  this.show = function() {
    stroke(this.h, 255, 255, 25);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }
    this.t = this.t + random(10);
    this.t2 = this.t2 + random(10);
    strokeWeight(1);
    //line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    noStroke();
    fill(this.h, 255, 255, 25);
    rect(this.pos.x, this.pos.y, noise(this.t) * 50, noise(this.t2) * 50);
    this.updatePrev();
  };

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  };
}