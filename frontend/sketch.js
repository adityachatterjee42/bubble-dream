var bubAr=[];

function setup() {
  createCanvas((window.innerWidth || document.body.clientWidth) - 4, (window.innerHeight || document.body.clientHeight) - 4);
  smooth();
}

function draw() {
  // put drawing code here
  background(0, 0, 0);
  bubAr.forEach(function(bub) {
    bub.action();
  });
}

function Bubble() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(50, 70);
  this.randomspeed = 1;

  this.randomMove = function() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };

  this.action = function() {
    strokeWeight(0);
    this.randomMove();
    this.display();
  }
}

function mouseClicked() {
  bubAr.push(new Bubble());
}