//spheres
var spheres = [];
var sizeMin = 5;
var sizeMax = 300;
var freq = 800;     //frequency of new sphere creation in milliseconds
var speed = .1;      //speed by which sphere moves

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

    cycleSpheres();
}

function draw() {
    background(255);

    drawSpheres();

    moveCam();
}

function drawSpheres() {
    for (var i = 0; i < spheres.length; i++) {
        var b = spheres[i];

        //move sphere by speed
        b.zPos += speed;

        //delete from array
        popSphere(b);

        b.display();
    }
}

function cycleSpheres() {
    var interval = window.setInterval(pushSphere, freq);
}

function pushSphere() {
    spheres.push(new Sphere());
}

function popSphere(sphere) {
    var b = sphere;
    if (b.zPos >= 500) {
        spheres.shift();
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

function Sphere() {
    this.size = random(sizeMin, sizeMax);

    //position
    this.xPos = 0;
    this.yPos = 0;
    this.zPos = 0; 

    //rotation
    this.rX = noise(this.size) / 400;
    this.rY = noise(this.size) / 400;
    this.rZ = noise(this.size) / 400;

    //color
    this.r = random(255);
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
}


function keyReleased() {
    //get camera state
    if (keyCode == 49) {
        print(easy.getState());
        print(spheres.length);
    }
}