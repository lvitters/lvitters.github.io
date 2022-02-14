//grid
var elements = [];
var elementSize;
var gap;
var elementsPerRow = 40;

//switch between modes / shapes
var areOverlapping = true;
var areMorphing = false;
var morphCounter = 0;
var mode = 1;
var nextEvent = 10; //init with 10 seconds
var maxSwitchTime = 30; //in seconds

//global stroke thickness
var strokeW; //strokeWeight
var strT = 0;   //strokeWeight noise value

//global rotation
var globalRotation = 0;
var rotationMode = 0;
var areRotating = false;

//lerping
var lerpCount;
var lerpTime = 420;

//background color lerping
var bgColor = 360;
var bgColorTarget;

//fill color alpha lerping
var fillAlpha = 0;
var fillAlphaTarget;

//fill color brightness lerping
var fillBrightness = 0;
var fillBrightnessTarget;

//stroke color brightness lerping
var strokeBrightness = 0;
var strokeBrightnessTarget;

//stroke color alpha lerping
var strokeAlpha = 100;
var strokeAlphaTarget;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100, 100, 100, 100);
    rectMode(CENTER);

    buildGrid();

    pushElements();
}

function draw() {
    background(bgColor);
    
    frameRate(60);
    
    switchShapes();

    timedEvents();

    applyModes();
    applyRotationModes();

    //console.log("bgColorTarget: " + bgColorTarget + "\n" + "fillAlphaTarget: " + fillAlphaTarget + "\n" +  "fillBrightnessTarget: " + fillBrightnessTarget + "\n" +  "strokeAlphaTarget: " + strokeAlphaTarget + "\n" +  "strokeBrightnessTarget: " + strokeBrightnessTarget);

    //translate elements to middle of their position in grid
    translate(elementSize/2, elementSize/2);

    //lerp color values to their targets
    bgColor = lerpOverTime(bgColor, bgColorTarget);
    fillAlpha = lerpOverTime(fillAlpha, fillAlphaTarget);
    fillBrightness = lerpOverTime(fillBrightness, fillBrightnessTarget);
    strokeAlpha = lerpOverTime(strokeAlpha, strokeAlphaTarget);
    strokeBrightness = lerpOverTime(strokeBrightness, strokeBrightnessTarget);

    //reset noise values for all elements, only when there is no color (to mask the change), try this every 30 seconds
    if ((strokeBrightnessTarget == 0) && (fillBrightnessTarget == 0) && (frameCount % (60 * 30) == 0)) resetNoise();

    drawElements();
}

//push elements to list
function pushElements() {
    for (let i = -1; i < (windowWidth / elementSize) + 1; i++) {
        for (let j = -1; j < (windowHeight / elementSize) + 1; j++) {
            elements.push(new Element(elementSize, i * elementSize, j * elementSize, elements.length));
        }
    }
    //shuffle once at beginning in order to not get fish scale effect
    shuffleArray(elements);
}

//draw all elements in list
function drawElements() {
    
    //reset bool
    areOverlapping = false;

    //change strokeWeight globally with noise
    strT += random(.0005, .005);
    strokeW = map(noise(this.strT), 0, 1, -10, 25);
    if (strokeW <= 2) strokeW = 2;

    //TODO: maybe make this rotation also vary with noise?
    globalRotation += .02;

    //display elements and check for scale
    for (let i = 0; i < elements.length; i++) {
        let b = elements[i];
        b.draw();
        
        //are any elements overlapping? (if the scale is over 1 and it is not only circles then they not overlapping)
        if ((b.scale >= 1) || (b.state == 1)) areOverlapping = true;
    }

    //roation
    //once every second, if no elements are overlapping, shuffle the elements so they will overlap differently 
    //(because they are drawn on top of each other in the order of the array index)
    if ((frameCount % 60 == 0) && (!areOverlapping)) {
        shuffleArray(elements);
        console.log("shuffled");
    }
}

//determine grid
function buildGrid() {
    //determine size of single element
    elementSize = (windowWidth / elementsPerRow);

    //determine size of gap
    gap = - (elementSize / 5);
}

//switch the shapes in time interval
function switchShapes() {
    if (frameCount % 600 == 0) {
        areMorphing = true;
        for (let i = 0; i < elements.length; i++) {
            let b = elements[i];
            b.state++;
            if (b.state > 1) {
                b.state = 0;
            }
        }
    }
    //increment counter and reset after 3 seconds (180 frames)
    morphCounter++;
    if (morphCounter > 180) {
        morphCounter = 0;
        areMorphing = false;
    }
}

//change between modes and rotation modes after X seconds if some conditions are met
function timedEvents() {
    //modes
    if (frameCount % (nextEvent * 60) == 0) {
        randomMode();
        nextEvent = floor(random(10, maxSwitchTime));
    }

    //rotation modes
    //if only circles are there, every x seconds, if the shapes aren't currently morphing, switch between rotation modes
    //(to hide the transition between rotation and no rotation)
    if (elements[0].state == 0 && frameCount % 300 == 0 && areMorphing == false) {
        randomRotationMode();
    }
}

//assign values depending on mode
function applyModes() {
    switch (mode) {
        case 1:
            bgColorTarget = 360;
            fillAlphaTarget = 0;
            fillBrightnessTarget = 0;
            strokeAlphaTarget = 100;
            strokeBrightnessTarget = 0;
        break;
        case 2:
            bgColorTarget = 360;
            fillAlphaTarget = 0;
            fillBrightnessTarget = 0;
            strokeAlphaTarget = 50;
            strokeBrightnessTarget = 0;
        break;
        case 3:
            bgColorTarget = 360;
            fillAlphaTarget = 50;
            fillBrightnessTarget = 0;
            strokeAlphaTarget = 0;
            strokeBrightnessTarget = 0;
        break;
        case 4:
            bgColorTarget = 360;
            fillAlphaTarget = 50;
            fillBrightnessTarget = 100;
            strokeAlphaTarget = 0;
            strokeBrightnessTarget = 0;
        break;
        case 5:
            bgColorTarget = 0;
            fillAlphaTarget = 0;
            fillBrightnessTarget = 0;
            strokeAlphaTarget = 100;
            strokeBrightnessTarget = 100;
        break;
        case 6:
            bgColorTarget = 0;
            fillAlphaTarget = 100;
            fillBrightnessTarget = 100;
            strokeAlphaTarget = 100;
            strokeBrightnessTarget = 0;
        break;
        case 7:
            bgColorTarget = 0;
            fillAlphaTarget = 100;
            fillBrightnessTarget = 100;
            strokeAlphaTarget = 0;
            strokeBrightnessTarget = 100;
        break;
        case 8:
            bgColorTarget = 0;
            fillAlphaTarget = 50;
            fillBrightnessTarget = 100;
            strokeAlphaTarget = 0;
            strokeBrightnessTarget = 100;
        break;
        case 9:
            bgColorTarget = 0;
            fillAlphaTarget = 0;
            fillBrightnessTarget = 100;
            strokeAlphaTarget = 50;
            strokeBrightnessTarget = 100;
        break;
        case 10:
            bgColorTarget = 0;
            fillAlphaTarget = 50;
            fillBrightnessTarget = 100;
            strokeAlphaTarget = 100;
            strokeBrightnessTarget = 0;
        break;
    }     
}

//go to next mode
function nextMode() {
    if (mode < 10) mode += 1;
    else mode = 1;
    console.log("mode: " + mode);
}

//go to random mode
function randomMode() {
    mode = floor(random(1, 11));
    console.log("mode: " + mode);
}

//switch between no rotation, global rotation and individual rotation
function applyRotationModes() {
    switch (rotationMode) {
        case 1:
            areRotating = false;
            for (let i = 0; i < elements.length; i++) {
                let b = elements[i];
                b.isRotating = false;
            }
            break;
        break;
        case 2:
            areRotating = false;
            for (let i = 0; i < elements.length; i++) {
                let b = elements[i];
                b.isRotating = true;
            }
            break;
        break;
        case 3:
            areRotating = true;
            for (let i = 0; i < elements.length; i++) {
                let b = elements[i];
                b.isRotating = false;
            }
            break;
        break;
    }
}

//go to next rotation mode
function nextRotationMode() {
    if (rotationMode < 3) rotationMode += 1;
    else rotationMode = 1;
    console.log("rotationMode: " + rotationMode);
}

//go to random rotation mode
function randomRotationMode() {
    rotationMode = floor(random(1, 4));
    console.log("rotationMode: " + rotationMode);
}

//TODO make this function work for all values
function lerpOverTime(value, target) {
    //console.log(lerpCount);
    if (value != target && lerpCount < lerpTime) {
        lerpCount++;
        let amt = lerpCount/lerpTime;
        let lerped = lerp(value, target, amt)
        value = round(lerped, 0);

        //keep lerp from "hanging" at the last digits
        if (target > value) value += 1;
        else if (target < value) value -= 1;
    } else {
        lerpCount = 0;
        value = target;
    }
    return value;
}

//check key presses
function keyPressed() {
    //circles
    if (key == "1") {
        for (let i = 0; i < elements.length; i++) {
            let b = elements[i];
            b.state = 0;
        }
    }
    //squares    
    if (key == "2") {
        for (let i = 0; i < elements.length; i++) {
            let b = elements[i];
            b.state = 1;
        }
    }
    //cycle through modes (n key)
    if (keyCode == 78) {
        nextMode();
    }
    //random modes (m key)
    if (keyCode == 77) {
        randomMode();
    }
    //cycle through rotation modes (b key)
    if (keyCode == 66) {
        nextRotationMode();
    }
    //reset noise
    if (keyCode == 86) {
        resetNoise();
    }
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
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}