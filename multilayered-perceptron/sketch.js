let trainingData = [
    {
        input: [0,0],
        target: [0]
    },
    {
        input: [1,0],
        target: [1]
    },
    {
        input: [0,1],
        target: [1]
    },
    {
        input: [1,1],
        target: [0]
    }
]

function setup() {
    let nn = new NeuralNetwork(2, 2, 1);

    // Sort of works (kinda ????)
    for (let i = 0; i < 5000; i++){
        let data = random(trainingData);
        nn.train(data.input, data.target);
    }
    
    console.log(nn.feedforward([1, 0]));
    console.log(nn.feedforward([0, 1]));
    console.log(nn.feedforward([0, 0]));
    console.log(nn.feedforward([1, 1]));
} 

function draw() {

}