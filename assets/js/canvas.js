
canvas = new createjs.Stage("gameOutput");

function getObjects(array, property, value)
{
    var result = new Array();
    for (i = 0; i < array.length; i = i + 1)
    {
        if (array[i][property] == value)
        {
            result.push(array[i])
        }
    }
    return result
}



/*
function drawPlayers(context, array)
{
    var players = new getObjects(superObject, "type", "player");
    var result = new Array();
    for (i = 0; i < players.length; i = i + 1)
    {
        result.push(new createjs.Shape);
    }
}
*/


/*
function triangle(context, position, size)
{
    context.beginPath();
    if (position[2] == 0)
    {
        context.moveTo(position[0] + size, position[1])
        context.lineTo();
        context.lineTo();
    }
    if (position[2] == 2)
    {
        context.moveTo(position[0], position[1] + size)
        context.lineTo();
        context.lineTo();
    }
    if (position[2] == 4)
    {
        context.moveTo(position[0] - size, position[1])
        context.lineTo();
        context.lineTo();
    }
    if (position[2] == 6)
    {
        context.moveTo(position[0], position[1] - size)
        context.lineTo();
        context.lineTo();
    }
    context.lineTo();
    context.lineTo();
    context.fill();
}

function circle(context, position, size)
{
    context.arc(position[0], position[1], size, 0, 2 * Math.PI, true);
}
*/








var superObject =
[
    {
        type: "player",
        name: "william",
        position: [6, 9, 0],
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


function drawBullets(context, array)
{
	var bullets = getObjects(superObject, "name", "bullet");
    for (i = 0; i < bullets.length; i = i + 1)
	{
		var img = new Image();
		img.src = "bullet.png";
		context.drawImage(img, 
						bullets[i].position[0], 
						bullets[i].position[1]);
	}
}

function drawPlayers(context, array)
{
	var players = getObjects(superObject, "name", "player");
    for (i = 0; i < players.length; i = i + 1)
	{
		var img = new Image();
		img.src = "player.png";
		context.drawImage(img, 
						players[i].position[0], 
						players[i].position[1]);
	}
}

