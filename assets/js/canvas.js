// canvas = new createjs.Stage("gameOutput");

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











var superObject =
[
    {
        type: "player",
        name: "william",
        position: [6, 9],
        health: 69
    },
    {
        type: "projectile",
        name: "bullet",
        position: [5, 10],
        health: undefined
    },
    {
        type: "projectile",
        name: "bullet",
        position: [5, 10],
        health: undefined
    },
    {
        type: "penis",
        name: "vagina",
        position: [],
        health: 69
    }
]

console.log(getObjects(superObject, "name", "bullet"));