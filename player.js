var constants=require('./constants.js').constants;

function Player(sessionKey,grid,name,x,y){
    this.__sessionKey=sessionKey;
    this.__grid=grid
        this.__name=name;
    this.__maxhp=constants.maxhp;
    this.__hp=constants.maxhp;
    this.__damage=constants.damage;
    this.__position=[x,y,'north']
        this.__powerups={};

    this.position=function(pos){
        if (pos==undefined){
            return this.__position;
        }else{
            this.__grid[this.__position[0]][this.__position[1]]=0;
            this.__grid[pos[0]][pos[1]]=this;
            this.__position=pos;
        }
    }
    this.x=function(){
        return this.__position[0];
    }
    this.y=function(){
        return this.__position[1];
    }
    this.facing=function(val){
        if (val==undefined){return this.__position[2];}
        else{this.__position[2]=val;}
    }
    this.sessionKey=function(){return this.sessionKey;}
    this.name=function(){return this.__name;}
    this.hp=function(val){
        if (val==undefined){return this.__hp;}
        else{this.__hp=val;}
    }
    this.maxhp=function(val){return this.__maxhp;}
    this.damage=function(val){return this.__maxhp;}
    this.hasPowerup=function(name){
        return name in this.__powerups;
    }
    this.digest=function(name){
        return {
            type:'player',
            name:this.__name,
            position:this.__position,
            health:this.__hp,
            maxhealth:this.__maxhp,
        }
    }
}
