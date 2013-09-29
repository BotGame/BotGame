//client


var superObject =
[
    {
        type: "player",
        name: "william",
        position: [60, 90, 0],
        health: 69
    },
    {
        type: "projectile",
        name: "bullet",
        position: [5, 10, 1],
        health: undefined
    },
    {
        type: "projectile",
        name: "bullet",
        position: [5, 10, 2],
        health: undefined
    },
    {
        type: "obstacle",
        name: "wall",
        position: [169, 269, 3],
        health: 100
    }
]

//drawAll(superObject);

function startListeningData()
{
	var socket = io.connect('http://localhost');
	socket.on('gamestate', function (data)
	{
    	drawAll(data);
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
