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
        context.arc(bullets[i].position[0]*size, bullets[i].position[1]*size, size/2, 0, 2 * Math.PI, false);
        context.fill();

        context.moveTo(bullets[i].position[0]*size, bullets[i].position[1]*size)
        context.strokeStyle = '#ff0000';
        if (bullets[i].position[2] == "north")
        {
            context.lineTo(bullets[i].position[0]*size, bullets[i].position[1]*size - size/2);
        }
        if (bullets[i].position[2] == "west")
        {
            context.lineTo(bullets[i].position[0]*size - size/2, bullets[i].position[1]*size);
        }
        if (bullets[i].position[2] == "east")
        {
            context.lineTo(bullets[i].position[0]*size + size/2, bullets[i].position[1]*size);
        }
        else
        {
            context.lineTo(bullets[i].position[0]*size, bullets[i].position[1]*size + size/2);
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
        context.rect(players[i].position[0]*size - size/2, players[i].position[1]*size - size/2, size, size);
        context.fill();
        context.stroke();

        context.strokeStyle = 'rgba(0,0,0,0)';
        context.moveTo(players[i].position[0]*size, players[i].position[1]*size)
        context.strokeStyle = '#ff0000';
        if (players[i].position[2] == "north"){
            context.lineTo(players[i].position[0]*size, players[i].position[1]*size + size/2);
        }
        else if (players[i].position[2] == "west"){
            context.lineTo(players[i].position[0]*size - size/2, players[i].position[1]*size);
        }
        else if (players[i].position[2] == "east"){
            context.lineTo(players[i].position[0]*size + size/2, players[i].position[1]*size);
        }
        else if (players[i].position[2] == "south"){
            context.lineTo(players[i].position[0]*size, players[i].position[1]*size - size/2);
        }
        context.stroke();
        context.strokeStyle = 'rgba(0,0,0,0)';
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
    context.clearRect(0,0,canvas.width,canvas.height)
    drawGrid(context, canvas, 20);
	drawPlayers(context, gamestate, 10);
	drawBullets(context, gamestate, 10);
}

function startListeningData()
{
	socket.on('game_heartbeat', function (data){
    	drawAll(document.getElementById("gameOutputCanvas"),convertGameState(data.state,20));
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
    startListeningData();
})

