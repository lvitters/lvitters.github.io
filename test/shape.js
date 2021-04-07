class Shape {
    constructor(size, price, xPos, yPos) {
        //get price per m²
        this.relativePrice = price / size;

        //calc dimensions from size and price (in m²)
        this.side = sqrt(size) * scale;
        this.height = this.relativePrice * scale / 5;

        //calc color
        this.colorMap = map(this.relativePrice, 0, 35, 0, 360);
        this.color = color(this.colorMap, 100, 100);

        //position
        this.xPos = xPos * scale; 
        this.yPos = yPos * scale;
        this.zPos = this.height/2; 
    }

    display() {
        strokeWeight(0);
        fill(this.color);
        push();
        translate(this.xPos, this.yPos, this.zPos);
        box(this.side, this.side, this.height);
        //box(this.side * scale, this.side * scale, 2.5 * scale);
        pop();
    }
}
