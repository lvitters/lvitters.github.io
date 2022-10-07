p5.disableFriendlyErrors = true; // disables FES for better performance

//grid
var stripes = [];
var elementSize;
var gap;
var elementsPerRow = 40;
var limitedWidth = 800;
var limitedHeight = 800;

//switch between modes
var mode = 1;

//lerping
var lerpCount;
const lerpTime = 480;   //in frames

//background color lerping
var bgColor = 360;
var bgColorTarget;

//fill color alpha lerping
var fillAlpha = 0;
var fillAlphaTarget;

//fill color brightness lerping
var fillBrightness = 0;
var fillBrightnessTarget;

//debug
var debug = false;

function setup() {
    createCanvas(windowHeight, windowHeight);       //limit for performance
    colorMode(HSB, 100, 100, 100, 100);
    rectMode(CENTER);
    frameRate(60);
    pixelDensity(1);    //limit for performance

    buildGrid();
    pushElements();
    applyMode();
}

function draw() {
    background(bgColor);

    //translate elements to middle of their position in grid
    translate(elementSize/2, elementSize/2);

    computeLerping();

    drawElements();

    if (debug) showDebug();
}

//push elements to list
function pushElements() {
    //horizontal
    for (let i = 0; i < height / elementSize; i++) {
        stripes.push(new Stripe(elementSize, width/2 - (elementSize/2), i * elementSize, true, stripes.length));
        stripes.push(new Stripe(elementSize, i * elementSize, height/2 - (elementSize/2), false, stripes.length));
    }
    //shuffle once at beginning in order to not get fish scale effect
    shuffleArrayRandomly(stripes);
}

//draw all elements in list
function drawElements() {

    //display horizontal elements and check for scale
    for (let i = 0; i < stripes.length; i++) {
        let b = stripes[i];
        b.draw();
    }
}

//determine grid
function buildGrid() {
    //determine size of single element
    elementSize = (width / elementsPerRow);

    //determine size of gap
    gap = elementSize / 5;
}

//lerp value to target over time
function lerpOverTime(value, target) {
    //console.log(lerpCount);
    if (value != target && lerpCount < lerpTime) {
        lerpCount++;
        let amt = lerpCount/lerpTime;
        let lerped = lerp(value, target, amt)
        value = floor(lerped);

        //keep lerp from "hanging" at the last digits
        if (target > value) value += 1;
        else if (target < value) value -= 1;
    } else {
        lerpCount = 0;
        value = target;
    }
    return value;
}

//lerp color values to their targets
function computeLerping() {
    
    bgColor = lerpOverTime(bgColor, bgColorTarget);
    fillAlpha = lerpOverTime(fillAlpha, fillAlphaTarget);
}

//assign values depending on mode
function applyMode() {
    switch (mode) {
        case 1:
            bgColorTarget = 0;
        break;
    }     
    switch (mode) {
        case 2:
            bgColorTarget = 360;
        break;
    }   
}

//go to next mode
function nextMode() {
    if (mode < 2) mode += 1;
    else mode = 1;
    console.log("mode: " + mode);

    applyMode();
}

//go to random mode
function randomMode() {
    mode = floor(random(1, 3));
    console.log("mode: " + mode);

    applyMode();
}

//check key presses
function keyPressed() {

    //cycle through modes (q key)
    if (keyCode == 81) {
        nextMode();
    }

    //random mode (w key)
    if (keyCode == 87) {
        randomMode();
    }

    //order array by ascending index (a key)
    if (keyCode == 65) {
        orderArrayByAscendingIndex(stripes);
    }

    //shuffle array randomly (s key)
    if (keyCode == 83) {
        shuffleArrayRandomly(stripes);
    }

    //draw FPS (f key)
    if (keyCode == 70) {
        debug = !debug;
    }
}

//render how many FPS the sketch is running at
function showDebug() {
    fill(255);
    noStroke();
    rect(30, 5, 60, 30);

    fill(0, 100, 100);
    textSize(20);
    text("fps: " + floor(frameRate()), 0, 10);
}

//reset noise time value for all elements
function resetNoise() {
    console.log("noise reset");
    
    for(let i = 0; i < elements.length; i++) {
        let b = elements[i];
        b.hT = 0;
        b.sT = 0;
    }
}

//randomize array in-place using Durstenfeld shuffle algorithm
function shuffleArrayRandomly(array) {
    console.log("array shuffled");

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//order array by index in ascending order (unused)
function orderArrayByAscendingIndex(array) {
    console.log("array ordered by ascending index");
    
    let temp = [];

    for (let i = 0; i < array.length; i++) {
        let b = array[i];
        temp[b.index] = b;
    }

    for (let i = 0; i < temp.length; i++) {
        array[i] = temp[i];
    }
}