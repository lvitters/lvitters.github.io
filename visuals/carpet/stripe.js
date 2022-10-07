//individual element
class Stripe {

    constructor(size, xPos, yPos, horizontal, index) {
        
        //position
        this.index = index;
        this.pos = createVector(xPos, yPos);

        //size & scale
        this.size = size;
        this.scale = 1;
        this.scaleT = 0;
        
        //color
        this.fillCol;
        this.strokeCol;
        this.hue;
        this.sat;
        this.bri;
        this.alph;
        this.hT = random(10);
        this.sT = 0;
        this.bT = 0;
        this.aT = 0;

        //vertical or horizontal?
        this.horizontal = horizontal;
    }

    //draw single element
    draw() {
        //do calculations
        this.compute();

        //set fill and stroke
        fill(this.fillCol);
        noStroke();

        //draw shape
        if (this.horizontal) rect(this.pos.x, this.pos.y, windowWidth, elementSize);
        else rect(this.pos.x, this.pos.y, elementSize, windowHeight);
    }

    compute() {
        //color
        this.hT += random(.0005, .005);
        this.sT += random(.001, .08);
        this.bT += random(.001, .08);
        this.aT += random(.001, .08);
        this.hue = map(noise(this.hT), 0, 1, -60, 160);
        this.sat = map(noise(this.sT), 0, 1, 50, 110);
        this.bri = map(noise(this.sT), 0, 1, 50, 110);
        this.alp = map(noise(this.sT), 0, 1, 30, 110);

        //apply
        this.fillCol = color(this.hue, this.sat, this.bri, this.alp);
    }
}