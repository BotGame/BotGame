
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
    return result;
}


function drawBullets(context, array)
{
	var bullets = getObjects(array, "name", "bullet");
    for (i = 0; i < bullets.length; i = i + 1)
	{
		var img = new Image();
		img.src = "../img/bullet.png";
		var rotate_direction = bullets[i].position[2]*45*Math.PI/180;
		context.rotate(rotate_direction);
		context.drawImage(img, 
						bullets[i].position[0], 
						bullets[i].position[1]);
		context.rotate(-1*rotate_direction);
	}
}

function drawPlayers(context, array)
{
	var players = getObjects(array, "name", "player");
    for (i = 0; i < players.length; i = i + 1)
	{
		var img = new Image();
		img.src = "../img/player.png";
		//context.drawImage(img, 
		//				players[i].position[0], 
		//				players[i].position[1]);
		context.putImageData(img, 
						players[i].position[0], 
						players[i].position[1]);
	}
}

function drawAll(gamestate)
{
	//var canvas = document.getElementById("gameOutputCanvas");
	var context = canvas.getContext("2d");
	drawPlayers(context, gamestate);
	drawBullets(context, gamestate);
	//drawObstacles(canvas, gamestate);
}


drawAll(superObject);




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


		
		div.append(img);
		div.css({
			transform:rotate(bullets[i].position[2]*45*Math.PI/180);
			-ms-transform:rotate(bullets[i].position[2]*45*Math.PI/180); 
					//IE 9
			-webkit-transform:rotate(bullets[i].position[2]*45*Math.PI/180);
					// Safari and Chrome
		});
		

*/






//When I wrote this, only God and I understood what I was doing
//Now, God only knows





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

