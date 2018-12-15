/*
 * Neural Network simple JS library built during session 4 from
 * The Coding Train on Intelligence and Learning.
 * 
 * This library allows for only ONE hidden layer
 */

function sigmoid(x){
    return 1/(1+Math.exp(-x));
}

function dsigmoid(y){
    return y * (1-y)
}

class NeuralNetwork {
    /**
     * Function that creates and initializes a new neural network object 
     * 
     * @param {Number} nInput 
     * @param {Number} nHidden 
     * @param {Number} nOutput 
     */
    constructor(nInput, nHidden, nOutput) {
        this.nInput = nInput;
        this.nHidden = nHidden;
        this.nOutput = nOutput;

        this.weightsIH = new Matrix(this.nHidden, this.nInput);
        this.weightsHO = new Matrix(this.nOutput, this.nHidden);

        this.weightsIH.random();
        this.weightsHO.random();

        this.biasIH = new Matrix(this.nHidden, 1);
        this.biasHO = new Matrix(this.nOutput, 1);

        this.biasIH.random();
        this.biasHO.random();

        this.learningRate = 0.5;
    }

    feedforward(inputArr){
        let input = Matrix.fromArray(inputArr);

        // GENERATING THE HIDDEN OUTPUT
        let hidden = Matrix.multiply(this.weightsIH, input);
        hidden.add(this.biasIH);
        hidden.map(sigmoid); // activation function

        // GENERATING THE OUTPUT
        let output = Matrix.multiply(this.weightsHO, hidden);
        output.add(this.biasHO);
        output.map(sigmoid);

        return output.toArray();
    }

    train(inputArr, targetArr){
        let input = Matrix.fromArray(inputArr);

        // GENERATING THE HIDDEN OUTPUT
        let hidden = Matrix.multiply(this.weightsIH, input);
        hidden.add(this.biasIH);
        hidden.map(sigmoid); // activation function

        // GENERATING THE OUTPUT
        let output = Matrix.multiply(this.weightsHO, hidden);
        output.add(this.biasHO);
        output.map(sigmoid);

        let target = Matrix.fromArray(targetArr);

        // Calculate the error
        // ERROR = TARGET - OUTPUT
        let oError = Matrix.subtract(target, output);

        // Calulate output gradient
        let gradient = Matrix.map(output,dsigmoid);
        gradient.multiply(oError);
        gradient.multiply(this.learningRate);


        // Calculate hidden -> output deltas
        let hidden_t = Matrix.transpose(hidden);
        let deltaWeightHO = Matrix.multiply(gradient, hidden_t);

        // Adjust the weight by delta
        this.weightsHO.add(deltaWeightHO);
        // Adjust the bias by its delta (which so happen to be the gradient)
        this.biasHO.add(gradient);

        // Calculate the hidden layer error
        let weightsHO_t = Matrix.transpose(this.weightsHO);
        let hError = Matrix.multiply(weightsHO_t, oError);

        // Calculate hidden gradient
        let hGradient = Matrix.map(hidden, dsigmoid);
        hGradient.multiply(hError);
        hGradient.multiply(this.learningRate);

        // Calculate input -> hidden deltas
        let input_t = Matrix.transpose(input);
        let deltaWeightIH = Matrix.multiply(hGradient, input_t);

        this.weightsIH.add(deltaWeightIH);
        this.biasIH.add(hGradient);
    }
}