let nn;
let lrSlider;

let train = [
    {
        input: [0, 0],
        output: [0]
    },
    {
        input: [0, 1],
        output: [1]
    },
    {
        input: [1, 0],
        output: [1]
    },
    {
        input: [1, 1],
        output: [0]
    },
];

function setup(){
    createCanvas(400, 400);

    nn = new NeuralNetwork(2, 4, 1);
    lrSlider = createSlider(0, 0.5, 0.1, 0.1);
}

function draw(){
    background(0);

    for (let i = 0; i < 1000; i++){
        let data = random(train);
        nn.train(data.input, data.output);
    }

    //nn.setLearningRate(lrSlider.value());

    let res = 10;
    let cols = width/res;
    let rows = height/res;

    for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++){
            let x1 = i/cols;
            let x2 = j/rows;
            let input = [x2, x1];
            let y = nn.predict(input)
            //noStroke();
            fill(y*255);
            rect(i*res, j*res, res, res);
        }
}