var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var five = require("johnny-five");
var board = new five.Board();
app.listen(3334);
function handler (req, res) {
  fs.readFile(__dirname + '/browser/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  //socket.emit('event', { hello: 'world' });
  socket.on('my other event', function (data) {
  console.log(data);
  });
});

board.on("ready", function() {
  var vel = new five.Sensor("A1");
  var mic = new five.Sensor("A0");
  vel.on("data", function() {
    //console.log(this.value);
    if(this.value<75){
      io.emit('event', {keyPressed: 'pop'});
    }
    else if(this.value<300){
      io.emit('event', {keyPressed: 'push'});
    }
  });
  mic.on("data", function() {
    //console.log(this.value);
    if(this.value>75){
      io.emit('event', {keyPressed: 'blow'});
    }
  }); 
});