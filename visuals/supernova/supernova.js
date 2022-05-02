//spheres
var spheres = [];
var sizeMin = 5;
var sizeMax = 300;
var freq = 500;         //frequency of new sphere creation in milliseconds
var speed = .1;         //speed by which sphere moves

//easyCam
var easy;
var forward = false;
var maxCamDist = 300;
var minCamDist = 50;
var camSpeed = .2;
var camSpeedT = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pixelDensity(1.0);
    colorMode(HSB, 360, 100, 100, 100);
    setAttributes('antialias', true);
    frameRate(60);
    camSpeedT = random(10);

    initEasyCam();

    for (let i = 0; i < 50; i++) {
        pushSphere();
    }

    cycleSpheres();
}

function draw() {
    background(0);

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

        b.draw();
    }
}

function cycleSpheres() {
    window.setInterval(pushSphere, freq);
}

function pushSphere() {
    spheres.push(new Sphere());
}

function popSphere(sphere) {
    var b = sphere;
    if (b.zPos >= maxCamDist) {
        spheres.shift();
    }
}

function moveCam() {
    camSpeedT += random(.0005, .005);
    camSpeed = map(noise(camSpeedT), 0, 1, -0.5, 1.5)

    var camDist = easy.getDistance();

    if (camDist > minCamDist && forward == true) {
        easy.zoom(-camSpeed);
    }
    if (camDist <= minCamDist) {
        forward = false;
    }
    if (camDist < maxCamDist && forward == false) {
        easy.zoom(camSpeed);
    }
    if (camDist >= maxCamDist) {
        forward = true;
    }
}

function Sphere(zPos) {
    this.size = random(sizeMin, sizeMax);
    this.zPos = 0;

    //rotation
    this.rX = noise(this.size) / 400;
    this.rY = noise(this.size) / 400;
    this.rZ = noise(this.size) / 400;

    //color
    this.h = random(360);

    //transparency
    this.aT = random(100);
    this.a = 100;

    //stroke weight
    this.wT = random(100);
    this.w = 5;

    this.draw = function () {
        this.wT += random(.0005, .005);
        this.w = map(noise(this.wT), 0, 1, -1, 8);

        let col = color(this.h, 100, 100, 100);
        fill(col);
        strokeWeight(this.w);
        stroke(col);
        push();
            translate(0, 0, this.zPos);
            rotateZ(frameCount * this.rZ);
            rotateX(frameCount * this.rX);
            rotateY(frameCount * this.rY);
            sphere(this.size);
        pop();
    }
}

//initialize EasyCam object
function initEasyCam() {
    easy = createEasyCam(this._renderer, {distance: 100, center:[0,0,0], rotation:[1,0,0,0]});
}


function keyReleased() {
    //get camera state
    if (keyCode == 81) {
        print(easy.getState());
        print(spheres.length);
    }
}