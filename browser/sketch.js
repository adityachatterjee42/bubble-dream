var bubAr=[];
var popAr=[];
function setup() {
  createCanvas((window.innerWidth || document.body.clientWidth) - 4, (window.innerHeight || document.body.clientHeight) - 4);
  smooth();
}
function draw() {
  background(0, 0, 0, 20);
  bubAr.forEach(function(bub) {
    bub.action();
  });
  popAr.forEach(function(par) {
    par.display();
  });
}
function Bubble() {
  this.x = random(width);
  this.y = random(height);
  this.height = random(80, 120);
  this.width = this.height;
  this.colorPalette = {
    r: random(100,150),
    g: random(100,150),
    b: random(100,150)
  };
  this.color = color(this.colorPalette.r, this.colorPalette.g, this.colorPalette.b, 45);
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
  this.pop = function() {

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
function Particle(bubbleX, bubbleY, bubbleR, bubbleColorPalette) {
  this.x = bubbleX + random(0,bubbleR*Math.cos(random(0, Math.PI*2)));
  this.y = bubbleY + random(0,bubbleR*Math.sin(random(0, Math.PI*2)));
  this.color = color(bubbleColorPalette.r, bubbleColorPalette.g, bubbleColorPalette.b, 15);
  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, random(3,7), random(3,7));
  };
}
function popBubble() {
  var index = Math.floor(Math.random()*bubAr.length);
  for(var i=0; i<100; i++){
    popAr.push(new Particle(bubAr[index].x, bubAr[index].y, bubAr[index].height/2, bubAr[index].colorPalette));
    setTimeout(function(){ popAr.splice(popAr.length-1, 1) }, random(100, 300));
  }
  bubAr.splice(index, 1);
}
function mouseClicked(){
  bubAr.push(new Bubble());
}
function keyTyped() {
  if (key === ' ') {
    popBubble();
  }
}