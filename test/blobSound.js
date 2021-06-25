//blobs
const blobs = [];

//frequencies (human voice has a range from roughly 80Hz to 16KHz, the range here ('lowestFreq' to 'highestFreq') has been determined according to just one particular microphone)
const lowestFreq = 1000;
const highestFreq = 5000;
const bands = 32; //2^4
const bandSize = (highestFreq - lowestFreq) / bands;

//sound
var mic;
var fft;
var spectrum;

var bgColor;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.id("canvas");
    colorMode(RGB, 360, 360, 360, 360);
    bgColor = 0;

    initAudioIn();

    pushBlobs();
}

function draw() {
    //reset background each frame  
    background(bgColor);

    //move everything to center
    translate(width/2, height/2);

    analyzeSpectrum();

    drawBlobs();
}

function pushBlobs() {
    for (let i = 0; i < bands; i++) {
        blobs.push(new Blob(i));
    }
}

function drawBlobs() {
    for (let i = blobs.length-1; i >= 0; i--) {
        let b = blobs[i];
        b.draw();
    }
}

function Blob(index) {
    //blob's radius, gets bigger with higher index
    var ra = index * 20;

    //noise
    var noiseMax = 0;
    var zT = 0;

    //init color values
    var r = 0;
    var g = 0;
    var b = 0;

    //init noise values for colors
    var rT = random(360);
    var gT = random(360);
    var bT = random(360);

    //lowest and highest frequency for each band
    var loFreq = lowestFreq + (bandSize * index);
    var hiFreq = lowestFreq + (bandSize * index) + bandSize;

    //console.log(loFreq + " " + hiFreq);

    //init peakDetect
    var peakDetect =  new p5.PeakDetect(loFreq, hiFreq, .4);
    
    this.draw = function() {

        //map color noise values to RGB(A), color circle range slightly increased to avoid lowest and highest values never being reached)
        r = map(noise(rT), 0, 1, -30, 390);
        g = map(noise(gT), 0, 1, -30, 390);
        b = map(noise(bT), 0, 1, -30, 390);

        //apply colors
        noStroke(0);
        fill(r % 360, g % 360, b % 360);

        //increment T for hue
        rT += random(0.001, 0.005);
        gT += random(0.001, 0.005);
        bT += random(0.001, 0.005);

        //detect peak
        peakDetect.update(fft);

        //get energy (loudness) for frequency band
        var energy = fft.getEnergy(loFreq, hiFreq);

        if (peakDetect.isDetected) {

            //console.log(index + " " + loFreq);
            
            //increment zT according to amplitude
            zT += map(energy, 0, 255, 0.005, 0.2);
            
            //calc increment for noiseMax and apply
            noiseMaxInc = map(energy, 0, 255, 0, .75);
            noiseMax += noiseMaxInc;

        } else {
            //increment t not according to amplitude
            zT += .001;
            
            //decrement noiseMax back to normal value
            if (noiseMax >= .5) noiseMax -= .01;
        }

        //draw blob
        beginShape();
            for (var a = 0; a < TWO_PI; a += 0.08) {
                //go through noise field in a circle
                let xT = map(cos(a), -1, 1, 0, noiseMax);
                let yT = map(sin(a), -1, 1, 0, noiseMax);

                //apply to each vertex
                let r = map(noise(xT, yT, zT), 0, 1, 0, ra);
                let x = r * cos(a);
                let y = r * sin(a); 
                vertex(x, y);
            }
        endShape(CLOSE);
    }
}

function initAudioIn() {
        //create and start new AudioIn
        mic = new p5.AudioIn();
        mic.start();
        
        //create new fft object patch input stream to it
        fft = new p5.FFT(.9, bands);
        fft.setInput(mic);
}

function analyzeSpectrum() {
        //analyze frequency spectrum
        spectrum = fft.analyze();
}

function touchStarted() { getAudioContext().resume(); } 