let img;
let imageWidth, imageHeight;

let cursor;

let music;
let timeStamp;

let interval = 5;

let tts;

let phrases = ['You can do this', 'You are the champ', 'Everything will be ok', 'It will all be over soon', 'For building a better tomorrow', 'You are amazing', 'Everybody wants to be like you', 'Your parents must be proud of you', 'This is no problem for you', 'It is all going to be worth it', 'Nothing really matters', "The universe is going to end some day anyways", "Reality is an illusion"];

function preload() {
    img = loadImage('media/speaker.png');
    cursor = loadImage('media/cursor.jpg');

    soundFormats('mp3');
    music = loadSound('media/meditation_music.mp3', playMusic);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1.0);
    setAttributes('antialias', true);
    frameRate(60);

    imageWidth = img.width * 2;
    imageHeight = img.height * 2;

    getAudioContext().suspend();

    tts = new p5.Speech('Google US English');
    tts.setRate(.9);
    tts.setPitch(.95);

    interval *= 60;
}

function draw() {
    background(255);

    image(img, windowWidth - imageWidth, windowHeight - imageHeight, imageWidth, imageHeight);

    if (frameCount % interval == 0 && music.isPlaying()) tts.speak(random(phrases));
}

function playMusic() {
    music.play();
}

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

function mousePressed() {
    userStartAudio();
}