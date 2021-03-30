let angle = 0;
let points = [];
let projected3d;

let purple, blue, lightBlue, blueish, greenish, green, yellow, orange, reddish, pink;

function setup() {
    let size = min(windowWidth, windowHeight);
    createCanvas(size, size, WEBGL);

    setUpPentachoron();
}

function draw() {
    background(255);
    
    rotatePentachoron();

    connectLines();
}

//connect to vertices and draw line in between
//adapted from Daniel Shiffman
//https://youtu.be/XE3YDVdQSPo
function connect(offset, i, j, points, c) {
    strokeWeight(3);
    stroke(c);
    const a = points[i + offset];
    const b = points[j + offset];
    line(a.x, a.y, a.z, b.x, b.y, b.z);
}

//connect all vertices (pentachoron has 5 vertices but 10 edges) and apply colors
function connectLines() {
    connect(0, 0, 1, projected3d, purple);
    connect(0, 1, 2, projected3d, blue);
    connect(0, 2, 0, projected3d, lightBlue);
    connect(0, 0, 3, projected3d, blueish);
    connect(0, 1, 3, projected3d, greenish);
    connect(0, 2, 3, projected3d, green);
    connect(0, 0, 4, projected3d, yellow);
    connect(0, 1, 4, projected3d, orange);
    connect(0, 2, 4, projected3d, reddish);
    connect(0, 3, 4, projected3d, pink); 
}

//setup pentachoron coordinates and colors,  https://en.wikipedia.org/wiki/5-cell
function setUpPentachoron() {
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

//rotate vertices around XY and ZW plane and project to 3D
//adapted from Daniel Shiffman
//https://youtu.be/XE3YDVdQSPo
function rotatePentachoron() {
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