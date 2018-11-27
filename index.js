var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var keypress = require('keypress');

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

keypress(process.stdin);
 
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    process.exit(0);
  }
  else{
    io.emit('event', {keyPressed: ch});
  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();