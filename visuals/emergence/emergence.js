var elements = [];
var elementSize;
var gap;
var elementsPerRow = 40;
var areOverlapping = true;
var areMorphing = false;
var morphCounter = 0;
var mode = 1;
var lerpTime = 500;
var strokeW;
var strT;

//background color lerping
var bgColor = 360;
var bgColorTarget;
var bgLerpCount = 0;

//fill color alpha lerping
var fillAlpha;
var fillAlphaTarget;
var fillAlphaLerpCount;

//stroke color brightness lerping
var strokeBrightness;
var strokeBrightnessTarget;
var strokeBrightnessLerpCount;

//stroke color alpha lerping
var strokeAlpha;
var strokeAlphaTarget;
var strokeAlphaLerpCount;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
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
    lerpBackground();
    background(bgColor);
    
    frameRate(60);
    
    switchShapes();

    //translate elements to middle of their position in grid
    translate(elementSize/2, elementSize/2);
    
    //lerp stuff
    lerpFillAlpha();
    lerpStrokeBrightness();
    lerpStrokeAlpha();

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
    strokeW = map(noise(this.strT), 0, 1, -8, 30);
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
        //set areMorphing to true
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
    //console.log(areMorphing);
}

//change background color in small steps 
function lerpBackground() {
    if (mode <= 2) {
        bgColorTarget = 360;
    } else {
        bgColorTarget = 0;
    }

    if (bgColor != bgColorTarget && bgLerpCount < lerpTime) {
        bgLerpCount++;
        let amt = bgLerpCount/lerpTime;
        var lerped = lerp(bgColor, bgColorTarget, amt);
        bgColor = floor(lerped) + 1;
    } else {
        bgLerpCount = 0;
        bgColor = bgColorTarget;
    }
}

//change alpha(transparency) of fill color in small steps
function lerpFillAlpha() {
    if (mode <= 2) {
        fillAlphaTarget = 0;
    } else {
        fillAlphaTarget = 100;
    }

    if (fillAlpha != fillAlphaTarget && fillAlphaLerpCount < lerpTime) {
        fillAlphaLerpCount++;
        let amt = fillAlphaLerpCount/lerpTime;
        var lerped = lerp(fillAlpha, fillAlphaTarget, amt);
        fillAlpha = floor(lerped);
    } else {
        fillAlphaLerpCount = 0;
        fillAlpha = fillAlphaTarget;
    }
}

//change brightness(how black or "colored-ness") of fill color in small steps
function lerpStrokeBrightness() {
    if (mode == 2) {
        strokeBrightnessTarget = 100;
    } else {
        strokeBrightnessTarget = 0;
    }

    if (strokeBrightness != strokeBrightnessTarget && strokeBrightnessLerpCount < lerpTime) {
        strokeBrightnessLerpCount++;
        let amt = strokeBrightnessLerpCount/lerpTime;
        var lerped = lerp(strokeBrightness, strokeBrightnessTarget, amt);
        strokeBrightness = floor(lerped);
    } else {
        strokeBrightnessLerpCount = 0;
        strokeBrightness = strokeBrightnessTarget;
    }
}

//change brightness(how black or "colored-ness") of fill color in small steps
function lerpStrokeAlpha() {
    if (mode == 4) {
        strokeAlphaTarget = 0;
    } else {
        strokeAlphaTarget = 100;
    }

    if (strokeAlpha != strokeAlphaTarget && strokeAlphaLerpCount < lerpTime) {
        strokeAlphaLerpCount++;
        let amt = strokeAlphaLerpCount/lerpTime;
        var lerped = lerp(strokeAlpha, strokeAlphaTarget, amt);
        strokeAlpha = floor(lerped);
    } else {
        strokeAlphaLerpCount = 0;
        strokeAlpha = strokeAlphaTarget;
    }
}

//check key presses
function keyPressed() {
    if (key == "1") {
        for (let i = 0; i < elements.length; i++) {
            let b = elements[i];
            b.state = 0;
        }
    }    
    if (key == "2") {
        for (let i = 0; i < elements.length; i++) {
            let b = elements[i];
            b.state = 1;
        }
    }
    //cycle through modes
    if (keyCode == 32) {
        if (mode < 4) mode += 1;
        else mode = 1;
        console.log(mode);
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