p5.disableFriendlyErrors = true; //<- turn of error checking for perfomance (does this help? I dunno)

//easyCam
let easy;
let initialState;
let currentState;

//buttons
let left;
let right;

//array for shapes
let shapes = [];

//array for cities
let cities = ["Berlin", "Hamburg", "Munchen", "Koln", "Frankfurt-am-Main", "Stuttgart", "Dusseldorf", "Dortmund", "Essen", "Leipzig", "Bremen"];
let cityJSONs = [];
let cityIndex = 0;

//text
let cityName;
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

    buttons();

    //3D text setup
    textFont(font);
    textSize(sideLength);
    textAlign(LEFT, BOTTOM);

    initEasyCam();
}

function draw() {
    background(255);

    //recenter grid in canvas
    translate((-sideLength/2) * scale, (-sideLength/2) * scale);

    drawShapes();

    drawName();
}

function calcGrid() {
    //get number of rooms from number of json objects in file
    numberOfRooms = Object.keys(rooms).length;
    //get number of rows (same as columns because grid is square)
    rows = floor(sqrt(numberOfRooms));
    //calc length of entire grid's side for centering to sketch
    sideLength = rows * cellSize;
}

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

    calcGrid();
    pushShapes();
}

function drawShapes() {
    for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        shape.display(i);
    }
}

//draw cityName on top of grid
function drawName() {
    fill(0);
    text(cityName, 0, 0);
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

function initEasyCam() {
    easy = createEasyCam({distance: 800, rotation: [1.5, 0, 0, 0]});
    initialState = easy.getState();
    print(initialState);
}

function buttons() {
    left = createButton('<');
    left.position(width/8, height/2);
    left.class('button');
    left.mousePressed(goLeft);

    right = createButton('>');
    right.position(width/8 * 7, height/2);
    right.class('button');
    right.mousePressed(goRight);
}

//helper functions because button callback's can't have parameters
function goLeft() {
    setCity(-1);
}
function goRight() {
    setCity(1);
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        setCity(1); 
    } else if (keyCode == LEFT_ARROW) {
        setCity(-1);
    }
    
}

function keyReleased() {
    //get camera state
    if (keyCode == 48) {
        currentState = easy.getState();
        print(currentState);
    }

    //set camera state
    if (keyCode == 57) {
        print(initialState);
        easy.setState(initialState);
    }
}
