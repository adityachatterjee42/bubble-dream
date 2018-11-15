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
  this.diameter = random(80, 120);
  this.color = color(random(0, 255), random(0, 255), random(0, 255), 50);
  this.randomspeed = 1;

  this.randomMove = function() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  };



  this.display = function() {
    noStroke();
    fill(this.color);
    this.diameter+=random(-1,1);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };

  this.action = function() {
    
    this.randomMove();
    this.display();
  }
}

function mouseClicked() {
  bubAr.push(new Bubble());
}