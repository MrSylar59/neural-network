// This is our activation function
int sign(float n) {
  return n >= 0 ? 1 : -1;
}

class Perceptron {
  float[] w;
  float lr = 0.001;
  
  // Constructor
  Perceptron(int n) {
    w = new float[n];
    
    // Initialize our weights randomly
    for (int i = 0; i < w.length; i++) {
      w[i] = random(-1, 1);
    }
  }
  
  int guess(float[] inputs){
    float sum = 0;
    // We create our weighted sum here
    for (int i = 0; i < w.length; i++) {
      sum += inputs[i]*w[i];
    }
    
    int output = sign(sum);
    return output;
  }
  
  float guessY(float x) {
    float m = w[0]/w[1], b = w[2]/w[1];
    return -(m*x + b);
  }
  
  void train(float[] inputs, int target) {
    int guess = guess(inputs); // make a guess from inputs
    int error = target - guess; // calculate the error
    
    // adjust the weights relatively to the error
    for (int i = 0; i < w.length; i++)
      w[i] += error * inputs[i] * lr;
  }
}
