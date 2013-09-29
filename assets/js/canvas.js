function getObjects(array, property, value)
{
    var result = new Array();
    for (i = 0; i < array.length; i = i + 1)
    {
        if (array[i][property] == value)
        {
            result.push(array[i]);
        }
    }
    return result;
}

function drawBullets(context, array, size)
{
	var bullets = getObjects(array, "type", "projectile");
    for (i = 0; i < bullets.length; i = i + 1)
	{
        context.beginPath();
        context.arc(bullets[i].position[0], bullets[i].position[1], size/2, 0, 2 * Math.PI, false);
        context.fill();

        context.moveTo(bullets[i].position[0], bullets[i].position[1])
        context.strokeStyle = '#ff0000';
        if (bullets[i].position[2] == "north")
        {
            context.lineTo(bullets[i].position[0], bullets[i].position[1] - size/2);
        }
        if (bullets[i].position[2] == "west")
        {
            context.lineTo(bullets[i].position[0] - size/2, bullets[i].position[1]);
        }
        if (bullets[i].position[2] == "east")
        {
            context.lineTo(bullets[i].position[0] + size/2, bullets[i].position[1]);
        }
        else
        {
            context.lineTo(bullets[i].position[0], bullets[i].position[1] + size/2);
        }
        context.stroke();
	}
}

function drawPlayers(context, array, size)
{
	var players = getObjects(array, "type", "player");
    for (i = 0; i < players.length; i = i + 1)
	{
        context.beginPath();
        context.rect(players[i].position[0] - size/2, players[i].position[1] - size/2, size, size);
        context.fill();

        context.moveTo(players[i].position[0], players[i].position[1])
        context.strokeStyle = '#ff0000';
        if (players[i].position[2] == "north")
        {
            context.lineTo(players[i].position[0], players[i].position[1] + size/2);
        }
        if (players[i].position[2] == "west")
        {
            context.lineTo(players[i].position[0] - size/2, players[i].position[1]);
        }
        if (players[i].position[2] == "east")
        {
            context.lineTo(players[i].position[0] + size/2, players[i].position[1]);
        }
        else
        {
            context.lineTo(players[i].position[0], players[i].position[1] - size/2);
        }
        context.stroke();
	}
}

function drawGrid(context, canvas, size)
{
    context.beginPath();
    for (i = 0; i < canvas.width; i = i + size)
    {
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.strokeStyle = "#bebebe";
        context.stroke();
    }
    for (i = 0; i < canvas.height; i = i + size)
    {
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.strokeStyle = "#bebebe";
        context.stroke();
    }
}



function drawAll(canvas, gamestate)
{
	var context = canvas.getContext("2d");
    drawGrid(context, canvas, 20);
	drawPlayers(context, gamestate, 10);
	drawBullets(context, gamestate, 10);
}

function startListeningData()
{
	var socket = io.connect('http://localhost');
	socket.on('gamestate', function (data)
	{
    	drawAll(data);
		drawAll(superObject);
    	//socket.emit('my other event', { my: 'data' });
	});
}

function convertGameState(object, length)
{
    result = new Array();
    for (i = 0; i < length; i = i + 1)
    {
        for (j = 0; j < length; j = j + 1)
        {
            if (object[i][j] != 0)
            {
                result.push(object[i][j]);
            }
        }
    }
    return result
}

$(document).ready(function(){
    var superObject =
    [
        {
            type: "player",
            name: "william",
            position: [60, 90, "north"],
            health: 69
        },
        {
            type: "projectile",
            name: "bullet",
            position: [200, 80, "west"],
            health: undefined
        },
        {
            type: "projectile",
            name: "bullet",
            position: [200, 90, "east"],
            health: undefined
        },
        {
            type: "obstacle",
            name: "wall",
            position: [169, 269, "south"],
            health: 100
        }
    ]
    var canvas = document.getElementById("gameOutputCanvas");
    drawAll(canvas, superObject);
})