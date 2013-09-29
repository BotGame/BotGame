var constants=require('./constants.js').constants;

function Bullet(grid,x,y,facing,power){
    this.__grid=grid
    this.__power=constants.power;
    this.__position=[x,y,facing]

    this.digest=function(name){
        return {
            type:'projectile',
            name:"Craig",
            position:this.__position,
            health:-1,
            maxhealth:-1,
        }
    }

    this.x=function(){
        return this.__position[0];
    }
    this.y=function(){
        return this.__position[1];
    }
    this.facing=function(val){
        return this.__position[2];
    }
    this.position=function(pos){
        if (pos==undefined){
            return this.__position;
        }else{
            this.__grid[this.__position[0]][this.__position[1]]=0;
            this.__grid[pos[0]][pos[1]]=this;
            this.__position=[pos[0],pos[1],this.__position[2]];
        }
    }


}
exports.Bullet=Bullet;
