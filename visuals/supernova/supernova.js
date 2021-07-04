//shapes
var sizeMin = 5;
var sizeMax = 300;
var speed = .1;

//frequency of new shape creation in milliseconds
var shapeFreq = 800;

var shapes = [];

//easyCam
var easycam;
var forward = true;
var maxCamDist = 800;
var minCamDist = 1;

function setup() {
    initialize();

    initEasyCam();

    cycleShapes();
}

function draw() {
    background(255);

    //drawGizmo();

    drawShapes();
}

function initialize() {
    createCanvas(windowWidth, windowHeight - 4, WEBGL);
    pixelDensity(1.0);
    setAttributes('antialias', true);

    frameRate(60);
}

function drawShapes() {
    for (var i = 0; i < shapes.length; i++) {
        var b = shapes[i];

        //move shapes by speed
        b.zPos += speed;

        //delete from array
        shiftShape(b);

        b.display();
    }
}

function cycleShapes() {
    var interval = window.setInterval(pushShape, shapeFreq);
}

function pushShape() {
    shapes.push(new Cube());
}

function shiftShape(shape) {
    var b = shape;
    if (b.zPos >= 500) {
        shapes.shift();
    }
}

function Cube(s) {
    this.size = random(sizeMin, sizeMax);
    //this.size = noise(200) * sizeMax;
    //this.size = s;

    //this.index = i;

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
        //normalMaterial();
        push();
        translate(this.xPos, this.yPos, this.zPos);
        rotateZ(frameCount * this.rZ);
        rotateX(frameCount * this.rX);
        rotateY(frameCount * this.rY);
        sphere(this.size);
        pop();
    }
}


function drawGizmo() {
    // gizmo
    strokeWeight(1);
    stroke(255, 32, 0);
    line(0, 0, 0, 20, 0, 0);
    stroke(32, 255, 32);
    line(0, 0, 0, 0, 20, 0);
    stroke(0, 32, 255);
    line(0, 0, 0, 0, 0, 20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    easycam.setViewport([0, 0, windowWidth, windowHeight]);
}

//initialize EasyCam object
function initEasyCam() {
    easy = createEasyCam(this._renderer, {distance:2500, center:[0,0,0], rotation:[1,0,0,0]});
    initialState = easy.getState();
    lastState = initialState;
    print(initialState);
}

//switch cities with arrow keys
function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        setCity(1); 
    } else if (keyCode == LEFT_ARROW) {
        setCity(-1);
    }   
}

//doesn't really work, state object doesn't get saved properly??
function keyReleased() {
    //reset camera to original state
    if (keyCode == 49) {
        easy.setState(initialState);
        print(initialState);
    }
    
    //reset to last camera state    
    if (keyCode == 50) {
        easy.setState(lastState);
        print(lastState);
    }

    //get camera state
    if (keyCode == 51) {
        lastState = easy.getState();
        print(lastState);
    }
}