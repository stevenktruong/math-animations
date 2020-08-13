// Capture setup
const fps = 60;
const duration = 6;
const capturer = new CCapture({ format: "png", fps, timeLimit: duration, startTime: 2 });

let startMillis;

// Animation settings
const waveLength = 300;
const thetaMax = 4 * Math.PI;
const dtheta = (2 * Math.PI) / 60;

const nPoints = thetaMax / dtheta;
const lengthPerTheta = waveLength / thetaMax;

const dx = lengthPerTheta * dtheta;

const centerX = 75;
const centerY = 450;
const r = 50;

const horizontalWave = [];
const verticalWave = [];

let theta = 0;
let canvas;
let costheta;
let sintheta;

function preload() {
    costheta = loadImage("/animations/trig/images/cos-theta.png");
    sintheta = loadImage("/animations/trig/images/sin-theta.png");
}

function setup() {
    canvas = createCanvas(600, 525);
    frameRate(fps);
}

function draw() {
    if (!startMillis) {
        if (capture) capturer.start();
        startMillis = millis();
    }

    background(255);

    // Math images
    image(costheta, centerX - costheta.width / 2, 0);
    image(sintheta, 510, centerY - sintheta.height / 2);

    const x = centerX + r * Math.sin(theta);
    const y = centerY + r * Math.cos(theta);

    fill(0);
    strokeWeight(2);
    stroke(0);

    // Draw main circle and axes
    push();
    fill(255);
    circle(centerX, centerY, 2 * r);
    line(centerX - 1.25 * r, centerY, 500, centerY);
    line(centerX, centerY + 1.25 * r, centerX, 30);
    pop();

    // Draw point that theta corresponds to
    circle(x, y, 5);

    // Draw waves
    horizontalWave.unshift(y);
    verticalWave.unshift(x);

    if (horizontalWave.length > nPoints) horizontalWave.splice(-1, 1);
    if (verticalWave.length > nPoints) verticalWave.splice(-1, 1);

    // Draw horizontal wave
    push();
    stroke("red");

    const nHorizontal = horizontalWave.length;
    const currHorizontalX = 100 + centerX;
    const currHorizontalY = horizontalWave[0];

    let currX = currHorizontalX;
    let currY = currHorizontalY;
    for (let i = 1; i < nHorizontal; i++) {
        const prevX = currX;
        const prevY = currY;
        currX = prevX + dx;
        currY = horizontalWave[i];
        line(prevX, prevY, currX, currY);
    }

    pop();

    // Draw vertical wave
    push();
    stroke("blue");

    const nVertical = verticalWave.length;
    const currVerticalX = verticalWave[0];
    const currVerticalY = -100 + centerY;

    currX = currVerticalX;
    currY = currVerticalY;
    for (let i = 1; i < nVertical; i++) {
        const prevX = currX;
        const prevY = currY;
        currX = verticalWave[i];
        currY = prevY - dx;
        line(prevX, prevY, currX, currY);
    }

    pop();

    // Draw the most recent points added to the arrays
    circle(currHorizontalX, currHorizontalY, 5);
    circle(currVerticalX, currVerticalY, 5);

    // Draw line between circle point and the most recent points
    line(x, y, currHorizontalX, currHorizontalY);
    line(x, y, currVerticalX, currVerticalY);

    theta += dtheta % (2 * Math.PI);

    if (millis() - startMillis >= duration * 1000) {
        noLoop();
        return;
    }

    if (capture) capturer.capture(canvas.elt);
}
