var constants=require(./constants.js).constants;
function World(sessions){
    this.sessions=sessions;

    //Generate grid
    this.grid=[];
    for (var i = 0; i < constants.mapwidth; i++){
        grid[i]=[];
        for (var j = 0; j < constants.mapheight; j++){
            //Pointless comment
            grid[i][j]=0;
            console.log(grid[i][j]);
        }
    }

    this.players=[];

    this.addPlayer=function(sessionKey){
        var pos = findEmpty(this.grid);
        var player = new Player(sessionKey,grid,"Bot#"+Math.round(Math.random()*99999999),pos[0],pos[1]);
    }

    this.removePlayer=function(){
    }

    this.step=function(){
    }
}

function findEmpty(grid){
    for (var i = 0; i < constants.mapwidth; i++){
        for (var j = 0; j < constants.mapheight; j++){
            if (grid[i][j]==0){
                return [i,j]
            }
        }
    }
    return false
}
exports.World=World;
