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
  var button = new five.Button(2);
  button.on("press", function() {
    console.log( "Button pressed" );
    io.emit('event', {keyPressed: 'blow'});
  });

  
});