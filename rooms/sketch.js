p5.disableFriendlyErrors = true; //<- turn of error checking for perfomance (does this help? I dunno)

//easyCam
let easy;
let initialState;
let lastState;

//buttons
let left;
let right;

//array for shapes
let shapes = [];

//array for cities
let cities = ["Berlin", "Hamburg", "Munchen", "Koln", "Frankfurt-am-Main", "Stuttgart", "Dusseldorf", "Dortmund", "Essen", "Leipzig", "Bremen"];
let cityJSONs = [];
let cityIndex = 0;

//displayed info
let cityName;
let lastModified = "07.04.21"; 

//text
let font;

//json data
let rooms = [];
let numberOfRooms;

//grid
let cellSize = 5;
let rows;
let sideLength;
let scale = 10;

function preload() {
    //load JSONs
    for (let i = 0; i < 11; i++) {
        cityJSONs[i] = loadJSON('crawler/data/' + cities[i] + '.json');
    }

    //font
    font = loadFont('assets/Inconsolata-Regular.ttf');
}

function setup() {
    //general settings
    let cnv = createCanvas(windowWidth, windowHeight - 4, WEBGL);
    cnv.id("canvas");
    frameRate(30);
    colorMode(HSB, 360, 0, 0);

    setCity(0);

    setButtons();

    initEasyCam();
}

function draw() {
    background(255);

    //recenter grid in canvas
    translate((-sideLength/2) * scale, (-sideLength/2) * scale);

    drawShapes();

    drawName();
}

//calculate grid according to number of rooms in JSON
function calcGrid() {
    //get number of rooms from number of json objects in file
    numberOfRooms = Object.keys(rooms).length;
    //get number of rows (same as columns because grid is square)
    rows = floor(sqrt(numberOfRooms));
    //calc length of entire grid's side for centering to sketch
    sideLength = rows * cellSize;
}

//for every object in rooms add a Shape to shapes according to grid
function pushShapes() {
    shapes = [];
    for (let i = 0; i < rows; i++) {
        for (var j = 0; j < rows; j++) {
            let index = j * rows + i;
            let roomSize = rooms[index].size;
            let roomPrice = rooms[index].price;
            shapes.push(new Shape(roomSize, roomPrice, i * cellSize,  j * cellSize));
        }   
    }
}

//set up buttons for switching cities
function setButtons() {

    //left button
    if (left == null) {
        left = createButton('<');
        left.class('button');
        left.position((windowWidth/8) - (left.size().width), windowHeight/2);
        left.mousePressed(goLeft);
    }
    //remove if min number reached
    if (cityIndex <= 0) {
        left.hide();
    } else {
        left.show();
    }

    //right button
    if (right == null) {
        right = createButton('>');
        right.class('button');
        right.position((windowWidth/8) * 7 - (right.size().width * 2), windowHeight/2);     //why is *2 correct here??
        right.mousePressed(goRight);
    }
    //remove if max number reached
    if(cityIndex >= cities.length-1) {
        right.hide();
    } else {
        right.show();
    }
}

//set current city name and rooms array
function setCity(i) {
    //set cityIndex
    if (cityIndex >= 0 && cities.length-1 >= cityIndex) {
        cityIndex = cityIndex + i;
    }
     
    //keep between 0 and 10
    if (cityIndex <= 0) {
        cityIndex = 0;
    } else if (cityIndex >= cities.length-1) {
        cityIndex = cities.length-1;
    }

    cityName = cities[cityIndex];
    rooms = cityJSONs[cityIndex];

    //TODO: figure out how to lastModified from JSON <- not that important since the JSONS 
    //have to be updated manually with the crawler anyways
    // let currentFile = loadJSON('crawler/data/' + cityName + '.json');
    // lastModified = new Date(currentFile.lastModified);

    calcGrid();
    pushShapes();
    setButtons();
}

//display all shapes in shapes[]
function drawShapes() {
    for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        shape.display(i);
    }
}

//draw infos next to grid
function drawName() {
    textFont(font);
    textStyle(BOLD);
    
    //city name
    textSize(sideLength * .7);
    textAlign(LEFT, BOTTOM);
    fill(0);
    text(cityName + ".rooms", 0, - sideLength * .25);
    
    //last modified
    rotateZ(3/2 * PI);
    textAlign(RIGHT);
    textSize(sideLength * .5);
    text(lastModified, 0, -sideLength * .25);
    
    //number of rooms
    rotateZ(1/2 * PI);
    textAlign(RIGHT);
    textSize(sideLength);
    text(rows * rows, sideLength * scale, sideLength * scale + sideLength);
}

//initialize EasyCam object
function initEasyCam() {
    easy = createEasyCam(this._renderer, {distance:2500, center:[0,0,0], rotation:[1,0,0,0]});
    initialState = easy.getState();
    lastState = initialState;
    print(initialState);
}

//called when window is resized -> reset buttons
function windowResized() {
    setButtons();
}

//helper functions because button callback's can't have parameters
function goLeft() {
    setCity(-1);
}
function goRight() {
    setCity(1);
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
