p5.disableFriendlyErrors = true; // disables FES for better performance

//grid
var tiles = [];
var tileSize;
var gap;
var tilesPerRow = 22;
var limitedWidth = 800;
var limitedHeight = 800;

//switch between modes / shapes
var areOverlapping = true;
var areMorphing = false;
var morphCounter = 0;
var morphTime = 180;
var mode = 1;
var nextModeSwitch = 10; //init with 10 seconds
var modeSwitchCounter = 0;
var nextShapeSwitch = 10; //init with 10 seconds
var shapeSwitchCounter = 0;
const maxSwitchTime = 30; //in seconds

//global stroke thickness
var strokeW; //strokeWeight
var strT = 0;   //strokeWeight noise value

//global rotation
var globalRotation = 0;
var rotationMode = 1;
var areRotating = false;
var areRotatingRandomDirections = false;

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

//stroke color brightness lerping
var strokeBrightness = 0;
var strokeBrightnessTarget;

//stroke color alpha lerping
var strokeAlpha = 100;
var strokeAlphaTarget;

//debug
var debug = false;

function setup() {
    createCanvas(limitedWidth, limitedHeight);       //limit for performance
    colorMode(HSB, 100, 100, 100, 100);
    rectMode(CENTER);
    frameRate(60);
    pixelDensity(1);    //limit for performance

    buildGrid();
    pushTiles();
    randomMode();
    randomRotationMode();
}

function draw() {
    background(bgColor);

    timedEvents();

    incMorphCounter();

    //translate tiles to middle of their position in grid
    translate(tileSize/2, tileSize/2);

    computeLerping();

    drawTiles();

    if (debug) showDebug();
}

//push tiles to list
function pushTiles() {
    for (let i = -1; i < (width / tileSize) + 1; i++) {
        for (let j = -1; j < (height / tileSize) + 1; j++) {
            tiles.push(new Tile(tileSize, i * tileSize, (j * tileSize), tiles.length));
        }
    }
    //shuffle once at beginning in order to not get fish scale effect
    shuffleArrayRandomly(tiles);
}

//draw all tiles in list
function drawTiles() {
    
    //reset bool
    areOverlapping = false;

    //change strokeWeight globally with noise
    strT += Math.random() * (.005 - .0005) + .0005; //use JS native random function for performance
    strokeW = map(noise(this.strT), 0, 1, -10, tileSize * (2/3)); //map from -10 so that it will "stick" to 1 sometimes
    if (strokeW <= 2) strokeW = 2;

    //increment globalRotation
    globalRotation += .02;

    //display tiles and check for scale
    for (let i = 0; i < tiles.length; i++) {
        let b = tiles[i];
        b.draw();
        
        //are any tiles overlapping? (if the scale is over 1 and it is not only circles then they not overlapping); only set areOverlapping to true if it is false for performance
        if (((b.scale >= 1) || (b.state == 1)) && areOverlapping == false) areOverlapping = true;
    }
}

//determine grid
function buildGrid() {
    //determine size of single element
    tileSize = (width / tilesPerRow);

    //determine size of gap
    gap = - (tileSize / 5);
}

//switch the shapes in time interval
function switchShapes() {
    areMorphing = true;
    if (tiles[0].state == 1) console.log("circles");
    else console.log("squares");
    for (let i = 0; i < tiles.length; i++) {
        let b = tiles[i];
        b.state++;
        if (b.state > 1) {
            b.state = 0;
        }
    }
}

//increment counter to check if shapes are morphing or not (for rotationMode switching)
function incMorphCounter() {
    //increment counter and reset after 3 seconds (180 frames)
    morphCounter++;
    if (morphCounter > morphTime) {
        morphCounter = 0;
        areMorphing = false;
    }
}

//change between modes and rotation modes after X seconds if some conditions are met
function timedEvents() {
    modeSwitchCounter++;
    shapeSwitchCounter++;

    //modes
    if (modeSwitchCounter % (nextModeSwitch * 60) == 0) {
        randomMode();
        nextModeSwitch = floor(random(10, maxSwitchTime));
        modeSwitchCounter = 0;

        //console.log("next mode switch: + nextModeSwitch")
    }

    //shapes
    if (shapeSwitchCounter % (nextShapeSwitch * 60) == 0) {
        switchShapes();
        if (tiles[0].state == 1) nextShapeSwitch = floor(random(10, maxSwitchTime));
        else nextShapeSwitch = floor(random(10, maxSwitchTime/2))     //circles should be there for less time than squares
        shapeSwitchCounter = 0;

        //console.log("next shape switch: " + nextShapeSwitch);
    }

    //rotation modes
    //if only circles are there, every x seconds, if the shapes aren't currently morphing, switch between rotation modes
    //(to hide the transition between rotation and no rotation)
    if (tiles[0].state == 0 && (frameCount % 300 == 0) && areMorphing == false) {
        randomRotationMode();
    }

    //once every second, if no tiles are overlapping, shuffle the tiles so they will overlap differently 
    //(because they are drawn on top of each other in the order of the array index)
    if ((frameCount % 60 == 0) && (!areOverlapping)) {
        shuffleArrayRandomly(tiles);
    }

    //reset noise values for all tiles, only when there is no color (to mask the change), try this every 30 seconds
    if ((strokeBrightnessTarget == 0) && (fillBrightnessTarget == 0) && (frameCount % (60 * 30) == 0)) resetNoise();
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
    //console.log("bgColorTarget: " + bgColorTarget + "\n" + "fillAlphaTarget: " + fillAlphaTarget + "\n" +  "fillBrightnessTarget: " + fillBrightnessTarget + "\n" +  "strokeAlphaTarget: " + strokeAlphaTarget + "\n" +  "strokeBrightnessTarget: " + strokeBrightnessTarget);

    bgColor = lerpOverTime(bgColor, bgColorTarget);
    fillAlpha = lerpOverTime(fillAlpha, fillAlphaTarget);
    fillBrightness = lerpOverTime(fillBrightness, fillBrightnessTarget);
    strokeAlpha = lerpOverTime(strokeAlpha, strokeAlphaTarget);
    strokeBrightness = lerpOverTime(strokeBrightness, strokeBrightnessTarget);
}

//assign values depending on mode
function applyMode() {
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

    applyMode();
}

//go to random mode
function randomMode() {
    mode = floor(random(1, 11));
    console.log("mode: " + mode);

    applyMode();
}

//switch between no rotation, global rotation and individual rotation
function applyRotationMode() {
    switch (rotationMode) {
        case 1:
            areRotating = false;
            for (let i = 0; i < tiles.length; i++) {
                let b = tiles[i];
                b.isRotating = false;
            }
            break;
        break;
        case 2:
            areRotating = false;
            for (let i = 0; i < tiles.length; i++) {
                let b = tiles[i];
                b.isRotating = true;
            }
            break;
        break;
        case 3:
            areRotating = true;
            for (let i = 0; i < tiles.length; i++) {
                let b = tiles[i];
                b.isRotating = false;
                b.rotatingRight = true;
            }
            break;
        break;
        case 4:
            areRotating = true;
            for (let i = 0; i < tiles.length; i++) {
                let b = tiles[i];
                b.isRotating = false;
                b.rotatingRight = false;
            }
            break;
        break;
        case 5:
            areRotating = true;
            for (let i = 0; i < tiles.length; i++) {
                let b = tiles[i];
                b.isRotating = false;
                if (random(2) < 1) b.rotatingRight = false;
                else b.rotatingRight = true;
            }
            break;
        break;
    }
}

//go to next rotation mode and apply
function nextRotationMode() {
    if (rotationMode < 5) rotationMode += 1;
    else rotationMode = 1;
    console.log("rotationMode: " + rotationMode);
    applyRotationMode();
}

//go to random rotation mode and apply
function randomRotationMode() {
    rotationMode = floor(random(1, 6));
    console.log("rotationMode: " + rotationMode);
    applyRotationMode();
}

//check key presses
function keyPressed() {
    //circles
    if (key == "1") {
        for (let i = 0; i < tiles.length; i++) {
            let b = tiles[i];
            b.state = 0;
        }
    }

    //squares    
    if (key == "2") {
        for (let i = 0; i < tiles.length; i++) {
            let b = tiles[i];
            b.state = 1;
        }
    }

    //cycle through modes (q key)
    if (keyCode == 81) {
        nextMode();
    }

    //random mode (w key)
    if (keyCode == 87) {
        randomMode();
    }

    //cycle through rotation modes (e key)
    if (keyCode == 69) {
        nextRotationMode();
    }

    //random rotation mode (r key)
    if (keyCode == 82) {
        randomRotationMode();
    }

    //reset noise (n key)
    if (keyCode == 78) {
        resetNoise();
    }

    //order array by ascending index (a key)
    if (keyCode == 65) {
        orderArrayByAscendingIndex(tiles);
    }

    //shuffle array randomly (s key)
    if (keyCode == 83) {
        shuffleArrayRandomly(tiles);
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

//reset noise time value for all tiles
function resetNoise() {
    console.log("noise reset");
    
    for(let i = 0; i < tiles.length; i++) {
        let b = tiles[i];
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