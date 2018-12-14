Perceptron p;

Point[] pts = new Point[100]; // Our training data
ArrayList<Point> newPts = new ArrayList<Point>(); // Our new never seen points
float precision = 0;

void setup() {
  size(800, 800);
  p = new Perceptron(3);
  
  for (int i = 0; i < pts.length; i++)
    pts[i] = new Point();
}

void draw() {
  background(255);
  stroke(0);
  //line(0, height, width, 0);
  
  Point p1 = new Point(-1, f(-1));
  Point p2 = new Point(1, f(1));
  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());
  
  Point p3 = new Point(-1, p.guessY(-1));
  Point p4 = new Point(1, p.guessY(1));
  stroke(150, 0, 150);
  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());
  
  for (Point train : pts) {
    train.show();
    float[] inputs = {train.x, train.y, train.bias};
    int target = train.label;
    
    int guess = p.guess(inputs);
    if (guess == target)
      fill(0,255,0);
    else
      fill(255,0,0);
    
    noStroke();
    ellipse(train.pixelX(), train.pixelY(), 16,16);
  }
  
  precision = 0;
  
  for (Point test : newPts){
    test.show();
    
    float[] inputs = {test.x, test.y, test.bias};
    int target = test.label;
    
    int guess = p.guess(inputs);
    if (guess == target){
      fill(0,255,0);
      precision++;
    }
    else
      fill(255,0,0);
    
    noStroke();
    ellipse(test.pixelX(), test.pixelY(), 16,16);
  }
  
  if (newPts.size() > 0) {
    precision /= (newPts.size()/100);
    println("Precision: "+precision+"%");
  }
}

void mousePressed() {
  if (mouseButton == RIGHT) {
    for (Point train : pts) {
      float[] inputs = {train.x, train.y, train.bias};
      int target = train.label;
      p.train(inputs, target);
    }
  }
  else if (mouseButton == LEFT) {
    for (int i = 0; i < 100; i++){
      Point pt = new Point();
      newPts.add(pt);
    }
  }
}
