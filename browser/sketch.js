var bubAr=[];
function setup() {
  createCanvas((window.innerWidth || document.body.clientWidth) - 4, (window.innerHeight || document.body.clientHeight) - 4);
  smooth();
}
function draw() {
  background(0, 0, 0, 20);
  bubAr.forEach(function(bub) {
    bub.action();
  });
}
function Bubble() {
  this.x = random(width);
  this.y = random(height);
  this.height = random(80, 120);
  this.width = this.height;
  this.color = color(random(0, 255), random(0, 255), random(0, 255), 50);
  this.randomspeed = 1;
  this.wobbleBit = -7;
  this.wobbleCount = 10;
  this.randomMove = function() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  };
  this.wobble = function() {
    this.wobbleCount--;
    if(this.wobbleCount==0){
    this.wobbleCount=10;
    this.width = this.width - this.wobbleBit;
    this.height = this.height + this.wobbleBit;
    this.wobbleBit = this.wobbleBit * -1;
    }
  }
  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.width, this.height);
  };
  this.action = function() { 
    this.randomMove();
    this.wobble();
    this.display();
  }
}
function mouseClicked() {
  bubAr.push(new Bubble());
}