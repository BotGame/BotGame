//client

function startListeningData()
{
	var socket = io.connect('http://localhost');
	socket.on('gamestate', function (data)
	{
    	getObjects(data);
    	//socket.emit('my other event', { my: 'data' });
	});
}

function setUpCanvas()
{
/*
	stage = new createjs.Stage("gameOutput");
	createjs.Ticker.addEventListener("tick", handleTick);

	function handleTick() {
     //Circle will move 10 units to the right.
        circle.x += 10;
        //Will cause the circle to wrap back
        if (circle.x > stage.canvas.width) { circle.x = 0; }
        stage.update();
    }
*/
}

/*
server

var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/
