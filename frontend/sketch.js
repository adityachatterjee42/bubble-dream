var bubAr=[];

function setup() {
  createCanvas((window.innerWidth || document.body.clientWidth) - 4, (window.innerHeight || document.body.clientHeight) - 4);
}

function draw() {
  // put drawing code here
  background(0, 0, 0);
  bubAr.forEach(function(bub) {
    bub.move();
    bub.display();
  });
}

function Bubble() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(50, 70);
  this.speed = 2;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function mouseClicked() {
  bubAr.push(new Bubble());
}