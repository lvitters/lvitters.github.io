let xT = 0.0;
let blobs = [];
let blobsLength = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(RGB, 360, 360, 360, 360);

    pushBlobs();
}

function draw() {
    //reset background each frame  
    background(360);

    //move everything to center
    translate(width/2, height/2.5);

    drawBlobs();
}

function pushBlobs() {
    for (let i = 0; i < blobsLength; i++) {
        blobs.push(new Blob(i));
    }
}

function drawBlobs() {
    for (let i = blobs.length-1; i > 0; i--) {
        let b = blobs[i];
        b.draw();
    }
}

function Blob(index) {
    //blob's radius, gets bigger with higher index
    let ra = index * 20;

    //noise
    let noiseMax = 0;
    let zT = random(1);

    //init noise values for colors
    let rT = random(360);
    let gT = random(360);
    let bT = random(360);
    //let alT = random(360);

    this.draw = function() {
        
        //noise
        noiseMax = sin(zT);

        //map color noise values to RGB(A)
        let r = map(noise(rT), 0, 1, -30, 390);
        let g = map(noise(gT), 0, 1, -30, 390);
        let b = map(noise(bT), 0, 1, -30, 390);
        //let al = map(noise(alT), 0, 1, -30, 390);

        //apply colors
        noStroke(0);
        fill(r % 360, g % 360, b % 360);
        //fill(r % 360, g % 360, b % 360, al % 360);

        //draw blobs
        beginShape();
            for (let a = 0; a < TWO_PI; a += 0.08) {
                let xT = map(cos(a), -1, 1, 0, noiseMax);
                let yT = map(sin(a), -1, 1, 0, noiseMax);
                let r = map(noise(xT, yT, zT), 0, 1, 0, ra);
                let x = r * cos(a);
                let y = r * sin(a); 
                vertex(x, y);
            }
        endShape(CLOSE);
        
        //increment noise values
        zT += random(0.001, 0.005);

        rT += random(0.001, 0.005);
        gT += random(0.001, 0.005);
        bT += random(0.001, 0.005);
        //alT += random(0.001, 0.005);
    }
}