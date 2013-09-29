var constants=require('./constants.js').constants;
var Player=require('./player.js').Player;
var Bullet=require('./bullet.js').Bullet;

var left={
    'north':'west',
    'south':'east',
    'east':'north',
    'west':'south',
}
var right={
    'north':'east',
    'south':'west',
    'east':'south',
    'west':'north',
}
var vects={
    'north':[0,1],
    'south':[0,-1],
    'east':[1,0],
    'west':[-1,0],
}

function World(sessions){
    this.sessions=sessions;

    //Generate grid
    this.grid=[];
    for (var i = 0; i < constants.mapwidth; i++){
        this.grid[i]=[];
        for (var j = 0; j < constants.mapheight; j++){
            //Pointless comment
            this.grid[i][j]=0;
        }
    }

    this.players={};
    this.bullets=[];

    this.addPlayer=function(sessionKey){
        var pos = findEmpty(this.grid);
        var player = new Player(sessionKey,this.grid,"Bot#"+Math.round(Math.random()*99999999),pos[0],pos[1]);
        this.players[sessionKey]=player;
        this.grid[pos[0]][pos[1]]=player;
    }

    this.removePlayer=function(sessionKey){
        var pos=players[sessionKey].position();
        grid[pos[0]][pos[1]]=0;
        delete players[sessionKey];
    }

    this.digest=function(){
        out=[];
        for (var i = 0; i < constants.mapwidth; i++){
            out[i]=[];
            for (var j = 0; j < constants.mapheight; j++){
                out[i][j]=this.grid[i][j]==0?0:this.grid[i][j].digest();
            }
        }
        return out;
    }

    this.step=function(){
        players=this.players;
        for (sessionKey in players){

            currPlayer=players[sessionKey];
            command=sessions.getCmd(sessionKey);

            switch(command.move){
                case "left":
                        currPlayer.facing(left[currPlayer.facing()]);
                    break;
                case "right":
                        currPlayer.facing(right[currPlayer.facing()]);
                    break;
                case "forward":
                    var fwvec=vects[currPlayer.facing()];
                    var facing=currPlayer.facing();
                    var x = currPlayer.x()+fwvec[0];
                    var y = currPlayer.y()+fwvec[1];
                    if (isOnGrid(x,y)){
                        if (this.grid[x][y]==0){
                            currPlayer.position([x,y,facing])
                        }
                    }
                    break;
                default:
            }
        }

        for (sessionKey in players){
            currPlayer=players[sessionKey];
            command=sessions.getCmd(sessionKey);
            var fwvec=vects[currPlayer.facing()];
            var x = currPlayer.x()+fwvec[0];
            var y = currPlayer.y()+fwvec[1];
            if (command.fire && isOnGrid(x,y) && this.grid[x][y]==0){
                console.log("pew");
                //Make a bullet
                var bullet = new Bullet(this.grid,x,y,currPlayer.facing(),currPlayer.damage);
                this.bullets.push(bullet);
                this.grid[x][y]=bullet;
            }else if (command.shoot && isOnGrid(x,y) && isPlayer(grid[x][y])){
                damage(grid[x][y], currPlayer.damage);
            }
        }
        for (i in this.bullets){
            bullet=this.bullets[i];
            var fwvec=vects[bullet.facing()];
            var x = bullet.x()+fwvec[0];
            var y = bullet.y()+fwvec[1];
            if (isOnGrid(x,y) && this.grid[x][y]==0){
                bullet.position([x,y]);
            }else if(isOnGrid(x,y) && isPlayer(this.grid[x][y])){
                damage(this.grid[x][y],bullet.damage);
                this.bullets.splice(this.bullets.indexOf(bullet),1);
                this.grid[bullet.x()][bullet.y()]=0;
            }else{
                this.bullets.splice(this.bullets.indexOf(bullet),1);
                this.grid[bullet.x()][bullet.y()]=0;
            }
        }
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
function isPlayer(p){
    return p!=0 && p.__sessionKey!=undefined;
}
function isOnGrid(x,y){
    return !(x<0 || x >= constants.mapwidth || y<0 || y>=constants.mapheight)
}
function damage(p,amt){
    p.__hp-=constants.damage;
}
exports.World=World;
