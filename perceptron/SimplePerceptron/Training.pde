float f(float x) {
  // y = mx + b
  return 0.3*x + 0.2; // This is the function we try to approximate
}

class Point {
  float x, y, bias;
  int label;
  
  Point() {
    x = random(-1,1);
    y = random(-1,1);
    bias = 1;
    label = f(x) > y ? 1:-1;
  }
  
  Point(float x, float y) {
    this.x = x;
    this.y = y;
  }
  
  float pixelX(){
    return map(x, -1,1, 0,width);
  }
  
  float pixelY(){
    return map(y, -1,1, height,0);
  }
  
  void show() {
    stroke(0);
    
    if (label == 1)
      fill(255);
    else
      fill(0);
    
    float px = pixelX(), py = pixelY();
    ellipse(px, py, 32, 32);
  }
}
