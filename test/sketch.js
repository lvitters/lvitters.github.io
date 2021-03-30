//pentachoron calculations
let angle = 0;
let points = [];
let projected3d;

//colors for pentachoron (4D Tetrahedron) lines
let purple, blue, lightBlue, blueish, greenish, green, yellow, orange, reddish, pink;

//background music
let music;
let timeStamp;

//text to speech
let interval = 5 *60; //in seconds
let tts;
let normalPhrases = ['You are the champ', 'Everything will be ok', 'For building a better tomorrow', 'You are amazing', 'Everybody wants to be like you', 'Your parents must be proud of you', 'This is no problem for you', 'It is all going to be worth it'];
let weirdPhrases = ['Nothing really matters', 'The universe will end someday', 'It will all be over soon', 'Existence is futile', 'There is an end to everything'];
let fuckedUpPhrases = ['Your only chance to evacuate is to leave with us', 'You are going to die', 'There is no escape', 'Humanity is going to be recycled', 'Everyone you know will die', 'You have to come to the other side'];
let nextPhrase, lastPhrase;

//thresholds in seconds
let thresh1 = 30;
let thresh2 = 60;
let thresh3 = 90;

//start onClick
let isStarted = false;
let startTime;

function preload() {
    soundFormats('mp3');
    music = loadSound('media/meditation_music.mp3', playMusic);
}

function setup() {
    createCanvas(windowWidth/2, windowHeight/2, WEBGL);
    setAttributes('antialias', true);
    frameRate(60);

    cursor(HAND); //initial cursor to get users to click

    initTTS();

    initPentachoron();
}

function draw() {
    background(0, 0, 0, 0);

    playPhrases();

    calcPentachoron();

    if (isStarted) drawLines();
}

//needed for AudioContext
function playMusic() {
    music.play();
}

//debug keys
function keyPressed() {
    if (keyCode === 32) {
        if (music.isPlaying()) {
            music.pause();
        } else {
            music.play();
        }
    }

    if (keyCode === 71) {
        tts.speak(random(phrases));
    }
}

//initialize text-to-speech object
function initTTS() {
    getAudioContext().suspend();

    tts = new p5.Speech('Google US English');
    tts.setRate(.9);
    tts.setPitch(.95);
}

//change probabilities according to time sketch has run
function playPhrases() {
    //every interval (in seconds) starting when the music isPlaying
    if (frameCount % interval == 0 && isStarted) {
        let seconds = millis()/1000 + startTime;
        if (seconds < thresh1) {
            print("first phase");
            nextPhrase = random(normalPhrases);
        } else if (thresh1 < seconds && seconds < thresh2) {
            print("second phase");
            let rand = random();
            if (rand < .5)  nextPhrase = random(normalPhrases);
            else nextPhrase = random(weirdPhrases);
        } else if (thresh2 < seconds && seconds < thresh3 ) {
            print("third phase");
            let rand = random();
            if (rand < .5) nextPhrase = random(weirdPhrases);
            else nextPhrase = random(fuckedUpPhrases);
        } else {
            print("fourth phase");
            nextPhrase = random(fuckedUpPhrases);
        }

        //don't repeat the same phrase twice in a row
        if (lastPhrase != nextPhrase)  {
            tts.speak(nextPhrase);
            lastPhrase = nextPhrase;
        } else {
            playPhrases();
        }
    }
}

//start AudioContext on mouse press and set cursor to cross
function mousePressed() {
    userStartAudio();
    cursor(CROSS);

    isStarted = true; //boolean for checking if lines should be drawn
    startTime = millis()/1000;  //time since start when audioContext is created
}

//connect two vertices and draw line in between
//adapted from Daniel Shiffman
//https://youtu.be/XE3YDVdQSPo
function connect(i, j, points, c) {
    strokeWeight(3);
    stroke(c);
    const a = points[i];
    const b = points[j];
    line(a.x, a.y, a.z, b.x, b.y, b.z);
}

//connect all vertices of pentachoron (4D Tetrahedron), 10 edges connecting 5 vertices
function drawLines() {
    connect(0, 1, projected3d, purple);
    connect(1, 2, projected3d, blue);
    connect(2, 0, projected3d, lightBlue);
    connect(0, 3, projected3d, blueish);
    connect(1, 3, projected3d, greenish);
    connect(2, 3, projected3d, green);
    connect(0, 4, projected3d, yellow);
    connect(1, 4, projected3d, orange);
    connect(2, 4, projected3d, reddish);
    connect(3, 4, projected3d, pink); 
}

//setup pentachoron (4D Tetrahedron) coordinates and colors  https://en.wikipedia.org/wiki/5-cell
function initPentachoron() {
    const n = -1/sqrt(5);

    //cartesian coordinates for pentachoron
    points[0] = new P4Vector(1, 1, 1, n);
    points[1] = new P4Vector(1, -1, -1, n);
    points[2] = new P4Vector(-1, 1, -1, n);
    points[3] = new P4Vector(-1, -1, 1, n);
    points[4] = new P4Vector(0, 0, 0, n + sqrt(5));

    //prepare colors from Heaven's Gate logo
    purple = color(148, 48, 208);
    blue = color(66, 97, 247);
    lightBlue = color(53, 156, 231);
    blueish = color(35, 219, 211);
    greenish = color(74, 214, 167);
    green = color(142, 224, 126);
    yellow = color(230, 220, 97);
    orange = color(230, 176, 78);
    reddish = color(249, 104, 109);
    pink = color(250, 46, 159);
}

//rotate vertices around XY and ZW plane and project from 4D to 3D, works with any 4D object
//adapted from Daniel Shiffman
//https://youtu.be/XE3YDVdQSPo
function calcPentachoron() {
    rotateX(-PI / 2);
    projected3d = [];

    for (let i = 0; i < points.length; i++) {
        const v = points[i];

        const rotationXY = [
        [cos(angle), -sin(angle), 0, 0],
        [sin(angle), cos(angle), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
        ];

        const rotationZW = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, cos(angle), -sin(angle)],
        [0, 0, sin(angle), cos(angle)]
        ];

        let rotated = matmul(rotationXY, v);
        rotated = matmul(rotationZW, rotated);

        let distance = 2;
        let w = 1 / (distance - rotated.w);

        const projection = [
        [w, 0, 0, 0],
        [0, w, 0, 0],
        [0, 0, w, 0]
        ];

        let projected = matmul(projection, rotated);
        projected.mult(width / 8);
        projected3d[i] = projected;

        //draw vertices
        //stroke(0, 200);
        //strokeWeight(32);
        //noFill();
        //point(projected.x, projected.y, projected.z);
    }

    //angle = map(mouseX, 0, width, 0, TWO_PI);
    angle += 0.01;
}