var elements = [];
var elementSize;
var gap;
var elementsPerRow = 40;
var areOverlapping = true;
var areMorphing = false;
var morphCounter = 0;
var mode = 1;
var lerpTime = 300;
var strokeW; //strokeWeight
var strT;   //strokeWeight noise value
var nextEvent = 10; //init with 10 seconds
var maxSwitchTime = 30; //in seconds

var lerpCount;

//background color lerping
var bgColor = 360;
var bgColorTarget;
var bgLerpCount = 0;

//fill color alpha lerping
var fillAlpha = 0;
var fillAlphaTarget;
var fillAlphaLerpCount;

//stroke color brightness lerping
var strokeBrightness = 0;
var strokeBrightnessTarget;
var strokeBrightnessLerpCount;

//stroke color alpha lerping
var strokeAlpha = 100;
var strokeAlphaTarget;
var strokeAlphaLerpCount;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 100, 100, 100, 100);
    rectMode(CENTER);

    //determine size of single element
    elementSize = (windowWidth / elementsPerRow);

    //determine size of gap
    gap = - (elementSize / 5);

    //init strokeWeight noise
    strT = random(100);

    pushElements();
}

function draw() {
    background(bgColor);
    
    frameRate(60);
    
    switchShapes();

    doEvent();

    //translate elements to middle of their position in grid
    translate(elementSize/2, elementSize/2);
    
    //lerp values
    lerpBackground();
    lerpFillAlpha();
    lerpStrokeBrightness();
    lerpStrokeAlpha();
    //console.log("1: " + bgColor + " 2: " + fillAlpha + " 3: " + strokeBrightness + " 4: " + strokeAlpha);

    drawElements();
}

//push elements to list
function pushElements() {
    for (let i = -1; i < (windowWidth / elementSize) + 1; i++) {
        for (let j = -1; j < (windowHeight / elementSize) + 1; j++) {
            elements.push(new Element(elementSize, i * elementSize, j * elementSize));
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

    //display elements and check for scale
    for (let i = 0; i < elements.length; i++) {
        let b = elements[i];
        b.draw();
        
        //are any elements overlapping? (if the scale is over 1 and it is not only circles then they not overlapping)
        if ((b.scale >= 1) || (b.state == 1)) areOverlapping = true;
    }

    //once every second, if no elements are overlapping, shuffle the elements so they will overlap differently 
    //(because they are drawn on top of each other in the order of the array index)
    if ((frameCount % 60 == 0) && (!areOverlapping)) {
        shuffleArray(elements);
        console.log("shuffled");
    }
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

//do an event after random number of seconds
function doEvent() {
    if (frameCount % (nextEvent * 60) == 0) {
        randomMode();
        nextEvent = floor(random(10, maxSwitchTime));
    }
}

//go to next mode
function nextMode() {
    if (mode < 4) mode += 1;
    else mode = 1;
    console.log("mode: " + mode);
}

//go to random mode
function randomMode() {
    mode = floor(random(1, 5));
    console.log("mode: " + mode);
}

//TODO make this function work for all values
function lerpOverTime(value, target) {
    console.log(lerpCount);
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

//change background color in small steps 
function lerpBackground() {
    //decide which modes have which target value
    if (mode <= 1) {
        bgColorTarget = 360;
    } else {
        bgColorTarget = 0;
    }

    if (bgColor != bgColorTarget && bgLerpCount < lerpTime) {
        bgLerpCount++;
        let amt = bgLerpCount/lerpTime;
        let lerped = lerp(bgColor, bgColorTarget, amt)
        bgColor = round(lerped, 0);

        //keep lerp from "hanging" at the last digits
        if (bgColorTarget > bgColor) bgColor += 1;
        else if (bgColorTarget < bgColor) bgColor -= 1;
    } else {
        bgLerpCount = 0;
        bgColor = bgColorTarget;
    }

    //bgColor = lerpOverTime(bgColor, bgColorTarget);
}

//change alpha(transparency) of fill color in small steps
function lerpFillAlpha() {
    //decide which modes have which target value
    if (mode <= 2) {
        fillAlphaTarget = 0;
    } else {
        fillAlphaTarget = 100;
    }

    if (fillAlpha != fillAlphaTarget && fillAlphaLerpCount < lerpTime) {
        fillAlphaLerpCount++;
        let amt = fillAlphaLerpCount/lerpTime;
        let lerped = lerp(fillAlpha, fillAlphaTarget, amt);
        fillAlpha = round(lerped, 0);

        //keep lerp from "hanging" at the last digits
        if (fillAlphaTarget > fillAlpha) fillAlpha += 1;
        else if (fillAlphaTarget < fillAlpha) fillAlpha -= 1;
    } else {
        fillAlphaLerpCount = 0;
        fillAlpha = fillAlphaTarget;
    }

    //fillAlpha = lerpOverTime(fillAlpha, fillAlphaTarget);
}

//change brightness(how black or "colored-ness") of fill color in small steps
function lerpStrokeBrightness() {
    //decide which modes have which target value
    if (mode == 2) {
        strokeBrightnessTarget = 100;
    } else {
        strokeBrightnessTarget = 0;
    }

    if (strokeBrightness != strokeBrightnessTarget && strokeBrightnessLerpCount < lerpTime) {
        strokeBrightnessLerpCount++;
        let amt = strokeBrightnessLerpCount/lerpTime;
        let lerped = lerp(strokeBrightness, strokeBrightnessTarget, amt);
        strokeBrightness = round(lerped, 0);

        //keep lerp from "hanging" at the last digits
        if (strokeBrightnessTarget > strokeBrightness) strokeBrightness += 1;
        else if (strokeBrightnessTarget < strokeBrightness) strokeBrightness -= 1;
    } else {
        strokeBrightnessLerpCount = 0;
        strokeBrightness = strokeBrightnessTarget;
    }

    //strokeBrightness = lerpOverTime(strokeBrightness, strokeBrightnessTarget);
}

//change brightness(how black or "colored-ness") of fill color in small steps
function lerpStrokeAlpha() {
    //decide which modes have which target value
    if (mode == 4) {
        strokeAlphaTarget = 0;
    } else {
        strokeAlphaTarget = 100;
    }

    if (strokeAlpha != strokeAlphaTarget && strokeAlphaLerpCount < lerpTime) {
        strokeAlphaLerpCount++;
        let amt = strokeAlphaLerpCount/lerpTime;
        let lerped = lerp(strokeAlpha, strokeAlphaTarget, amt);
        strokeAlpha = round(lerped, 0);

            //keep lerp from "hanging" at the last digits
            if (strokeAlphaTarget > strokeAlpha) strokeAlpha += 1;
            else if (strokeAlphaTarget < strokeAlpha) strokeAlpha -= 1;
    } else {
        strokeAlphaLerpCount = 0;
        strokeAlpha = strokeAlphaTarget;
    }

    //strokeAlpha = lerpOverTime(strokeAlpha, strokeAlphaTarget);
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
    //cycle through modes (m key)
    if (keyCode == 77) {
        randomMode();
    }

}

//randomize array in-place using Durstenfeld shuffle algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}