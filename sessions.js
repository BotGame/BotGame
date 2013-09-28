/*
 * Sessions data structure
 */
function Sessions(){
    this.__keyToCmd={};
    this.addSession=function(){
        var out;
        do {
            out=genKey();
        }while (testMembership(this.__keyToCmd,out))
        this.__keyToCmd[out]=new Command("stop",false);
        return out;
    }
    this.removeSession=function(key){
        delete this.__keyToCmd[key];
    }
    this.getCmd=function(key){
        return this.__keyToCmd[key];
    }
    this.setCmd=function(key,move,fire){
        this.__keyToCmd[key]=new Command(move,fire);
    }
}

/*
 * Command data structure
 */
function Command(move,fire){
    this.move=move;
    this.fire=fire;
}

//Helper functions
function genKey(){
    return (Math.round(Math.random()*99999999)+Number(new Date())).toString(16);
}

function testMembership(dict, key){
    for (k in dict){
        if (k==key){
            //Pointless commment
            return true
        }
    }
    return false
}

exports.Sessions=Sessions
