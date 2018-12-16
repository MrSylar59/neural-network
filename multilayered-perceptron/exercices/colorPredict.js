let r, g, b;

let brain;
let which = "black";

function pickColor(){
    r = random(255);
    g = random(255);
    b = random(255);
    redraw();

    //console.log(r+g+b);
}

function colorPredictor(r, g, b){
    let input = [r/255, g/255, b/255];

    let output = brain.predict(input);
    
    if (output[0] > output[1])
        return "black";
    return "white";
}

function trainColor(r, g, b){
    return r+g+b < 300 ? [0,1] : [1,0];
}

function setup(){
    createCanvas(640, 360);

    brain = new NeuralNetwork(3, 3, 2);

    for (let i = 0; i < 10000; i++){
        let r = random(255);
        let g = random(255);
        let b = random(255);

        let target = trainColor(r, g, b);
        let input = [r/255, g/255, b/255];

        brain.train(input, target);
    }
    
    pickColor();
    noLoop();
}

function mousePressed(){
    let input = [r/255, g/255, b/255];
    let target = mouseX > width/2 ? [0,1] : [1,0];

    //brain.train(input, target);

    pickColor();
}

function draw(){
    background(r, g, b);

    strokeWeight(4);
    stroke(0);
    line(width/2, 0, width/2, height);

    textSize(64);
    noStroke();
    fill(0);
    textAlign(CENTER);
    text("black", 150, 250);

    fill(255);
    text("white", 450, 250);

    which = colorPredictor(r, g, b);

    if (which === "black"){
        fill(0);
        ellipse(150, 150, 60);
    }
    else {
        fill(255);
        ellipse(450, 150, 60);
    }
}