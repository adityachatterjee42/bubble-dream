var bubAr=[];
var popAr=[];
var globalWind = {
  x:0,
  y:0
};
var socket;
function setup() {
  createCanvas((window.innerWidth || document.body.clientWidth) - 4, (window.innerHeight || document.body.clientHeight) - 4);
  smooth();
  socket = io('http://localhost:3334');
  socket.on('event', function (data) {
    console.log(data.keyPressed);
    incomingEvent(data.keyPressed);
  });
}
function draw() {
  background(0, 0, 0, 20);
  bubAr.forEach(function(bub) {
    bub.action();
  });
  popAr.forEach(function(par) {
    par.display();
  });
  globalWindControl();
}
function globalWindControl(){
  if(globalWind.x>0)globalWind.x-=0.025;
  if(globalWind.x<0)globalWind.x+=0.025;
  if(globalWind.y>0)globalWind.y-=0.025;
  if(globalWind.y<0)globalWind.y+=0.025;
};
function Bubble() {
  this.x = random(width);
  this.y = random(height);
  this.height = random(60, 80);
  this.width = this.height;
  this.goalDiameter = random(140,160);
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
  this.spatialMove = function() {
    if(globalWind.x!=0){
      this.x+=globalWind.x;
    }
    if(globalWind.y!=0){
      this.y+=globalWind.y;
    }
    
  }
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
    if(this.height<this.goalDiameter || this.width<this.goalDiameter){
      this.height+=8;
      this.width+=8;
    }
  };
  this.action = function() { 
    this.randomMove();
    this.spatialMove();
    this.wobble();
    this.display();
  }
}
function Particle(bubbleX, bubbleY, bubbleR, bubbleColorPalette) {
  this.x = bubbleX + random(0,1.05*bubbleR*Math.cos(random(0, Math.PI*2)));
  this.y = bubbleY + random(0,1.05*bubbleR*Math.sin(random(0, Math.PI*2)));
  this.color = color(bubbleColorPalette.r+100, bubbleColorPalette.g+100, bubbleColorPalette.b+100, 15);
  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, random(3,7), random(3,7));
    this.y+=0.3;
  };
}
function popBubble() {
  var index = Math.floor(Math.random()*bubAr.length);
  bubAr[index].goalDiameter+=20;
  for(var i=0; i<100; i++){
    popAr.push(new Particle(bubAr[index].x, bubAr[index].y, bubAr[index].height/2, bubAr[index].colorPalette));
    setTimeout(function(){ popAr.splice(popAr.length-1, 1) }, random(300, 500));
  }
  bubAr.splice(index, 1);
}

function incomingEvent(event) {
  if(event === 'q'){
    bubAr.push(new Bubble());
  }
  if(event === 'w'){
    popBubble();
  }
  if(event === 'e'){
    globalWind.x=3; 
  }
  if(event === 'r'){
    globalWind.x=-3;  
  }
  if(event === 't'){
    while(bubAr.length>0){
      popBubble();
    }
  }
}

