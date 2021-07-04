//shapes
var sizeMin = 5;
var sizeMax = 300;
var speed = .1;

//frequency of new shape creation in milliseconds
var shapeFreq = 800;

var shapes = [];

//easyCam
var easy;
var forward = true;
var maxCamDist = 800;
var minCamDist = 1;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1.0);
    setAttributes('antialias', true);
    frameRate(60);

    initEasyCam();

    cycleShapes();
}

function draw() {
    background(255);

    drawShapes();

    moveCam();
}

function drawShapes() {
    for (var i = 0; i < shapes.length; i++) {
        var b = shapes[i];

        //move shapes by speed
        b.zPos += speed;

        //delete from array
        popShape(b);

        b.display();
    }
}

function cycleShapes() {
    var interval = window.setInterval(pushShape, shapeFreq);
}

function pushShape() {
    shapes.push(new Sphere());
}

function popShape(shape) {
    var b = shape;
    if (b.zPos >= 500) {
        shapes.shift();
    }
}

function moveCam() {
    var camDist = easy.getDistance();

    if (camDist > minCamDist && forward == true) {
        easy.zoom(-.1);
    }

    if (camDist == minCamDist) {
        forward = false;
    }

    if (camDist < maxCamDist && forward == false) {
        easy.zoom(.1);
    }

    if (camDist >= maxCamDist) {
        easy = true;
    }
}

function Sphere(s) {
    this.size = random(sizeMin, sizeMax);

    //position
    this.xPos = 0; //random(-100, 100); //noise(this.size)
    this.yPos = 0; //random(-100, 100);
    this.zPos = 0; //random(0, 2000);

    //rotation
    this.rX = noise(this.size) / 400;
    this.rY = noise(this.size) / 400;
    this.rZ = noise(this.size) / 400;

    //color
    this.r = random(255); //random(255); noise(this.size);
    this.g = random(255);
    this.b = random(255);

    //stroke weight
    this.w = 5;

    this.display = function () {
        noFill();
        strokeWeight(this.w);
        stroke(this.r, this.g, this.b);
        push();
            translate(this.xPos, this.yPos, this.zPos);
            rotateZ(frameCount * this.rZ);
            rotateX(frameCount * this.rX);
            rotateY(frameCount * this.rY);
            sphere(this.size);
        pop();
    }
}

//initialize EasyCam object
function initEasyCam() {
    easy = createEasyCam(this._renderer, {distance: 410, center:[0,0,0], rotation:[1,0,0,0]});
    print(easy.getState());
}


function keyReleased() {
    //get camera state
    if (keyCode == 49) {
        print(easy.getState());
    }
}