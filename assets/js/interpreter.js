var socket = io.connect('http://'+window.location.host);
var sessionKey;
socket.on('sessionKey',function(data){sessionKey=data.sessionKey;});


function outf(text) {
    if (text=="\n"){
        //Goes 'hacky hacky'
        return
    }
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = mypre.innerHTML + text;
    //process text
    if (validateJSON(text)){
        var move = window.JSON.parse(text);
        move.sessionKey=sessionKey;
        socket.emit('command', move);
    }
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function runit(gamestate) { 
    var prog = 'gameState='+gamestate+ "\n" + editor.getValue() + '\nval = getMove(gameState) \nprint \'{"move":"\'+str(val[0])+\'","shoot":"\'+str(val[1])+\'"}\'';
    console.log(prog)
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = ''; 
    Sk.canvas = "mycanvas";
    Sk.pre = "output";
    Sk.configure({output:outf, read:builtinRead}); 
    eval(Sk.importMainWithBody("<stdin>",false,prog)); 
}

var listening=false;
function heartbeatListener(){
    if (!listening){
        socket.emit('setup',{});
        socket.on('game_heartbeat',function(gameState){
            data = window.JSON.stringify(gameState.state);
        runit(data);
        });    
        listening=true;
    }
}

function validateJSON(text){
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    }else{
        return false;
    }
}
