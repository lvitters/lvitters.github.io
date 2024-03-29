//individual tile
class Tile {

    constructor(size, xPos, yPos, index) {
        
        //position
        this.index = index;
        this.pos = createVector(xPos, yPos);

        //size & scale
        this.size = size;
        this.scale = 1;
        this.scaleT = 0;

        //rotation
        this.rotation = 0;
        this.roT = 0;
        this.isRotating = false;
        
        //color
        this.fillCol;
        this.strokeCol;
        this.hue;
        this.sat;
        this.bri;
        this.hT = 0;
        this.sT = 0;

        //shape morphing
        this.circle = [];
        this.square = [];
        this.morph = [];
        this.state = 1;

        this.initShapes();
    }

    //draw single element
    draw() {
        //do calculations
        this.compute();

        //set fill and stroke
        fill(this.fillCol);
        strokeWeight(strokeW);
        stroke(this.strokeCol);

        //draw shape
        push();
            translate(this.pos.x, this.pos.y);
            scale(this.scale);
            rotate(this.rotation);
            this.drawShape();
        pop();
    }

    compute() {
        //color
        this.hT += Math.random() * (.005 - .0005) + .0005; //use JS native random function for performance
        this.sT += Math.random() * (.005 - .0005) + .0005; //use JS native random function for performance
        this.hue = map(noise(this.hT), 0, 1, -60, 160);
        this.sat = map(noise(this.sT), 0, 1, 10, 100);

        //apply
        this.fillCol = color(this.hue, this.sat, fillBrightness, fillAlpha);
        this.strokeCol = color(this.hue, this.sat, strokeBrightness, strokeAlpha);

        //scale
        this.scaleT += Math.random() * .005; //use JS native random function for performance
        this.scale = map(noise(this.scaleT), 0, 1, 0.2, 2.5);

        //rotation
        this.roT += Math.random() * .008; //use JS native random function for performance
        if (this.isRotating) this.rotation = map(noise(this.roT), 0, 1, 0, 10);
        else if (areRotating && this.rotatingRight) this.rotation = globalRotation;
        else if (areRotating && !this.rotatingRight) this.rotation = -globalRotation;
        else this.rotation = 0;
    }

    //initialize the (two) possible shapes with vertices
    initShapes() {
        //create a circle using vectors pointing from center
        for (let angle = 0; angle < 360; angle += 9) {
            //note we are not starting from 0 in order to match the
            //path of a circle.
            let v = p5.Vector.fromAngle(radians(angle - 135));
            v.mult(this.size/2);
            this.circle.push(v);
            //let's fill out morph ArrayList with blank PVectors while we are at it
            this.morph.push(createVector());
        }

        //a square is a bunch of vertices along straight lines
        //top of square
        for (let x = -this.size/2; x < this.size/2; x += this.size/2/5) {
            this.square.push(createVector(x, -this.size/2));
        }
        //right side
        for (let y = -this.size/2; y < this.size/2; y += this.size/2/5) {
            this.square.push(createVector(this.size/2, y));
        }
        //bottom
        for (let x = this.size/2; x > -this.size/2; x -= this.size/2/5) {
            this.square.push(createVector(x, this.size/2));
        }
        //left side
        for (let y = this.size/2; y > -this.size/2; y -= this.size/2/5) {
            this.square.push(createVector(-this.size/2, y));
        }
    }

    drawShape() {
        //look at each vertex
        for (let i = 0; i < this.circle.length; i++) {
            let v1;
            //are we lerping to the circle or the square?
            if (this.state == 0) {
                v1 = this.circle[i];
            } else if (this.state == 1) {
                v1 = this.square[i];
            }
            //get the vertex we will draw
            let v2 = this.morph[i];
            //lerp to the target
            v2.lerp(v1, 0.05);
        }

        //draw a polygon that makes up all the vertices
        beginShape();
            this.morph.forEach(v => {
                vertex(v.x, v.y);
            });
        endShape(CLOSE);
    }
}