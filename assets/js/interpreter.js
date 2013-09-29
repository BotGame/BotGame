var socket = io.connect('http://'+window.location.host);

function outf(text) { 
        var mypre = document.getElementById("output"); 
        mypre.innerHTML = mypre.innerHTML + text;
        //process text
        var move = window.JSON.parse(text);
        socket.emit('command',{sessionKey:mykey, move);
        
} 
function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
}

function runit(gamestate) { 
   var prog = 'gameState='+gamestate+ "\n" + document.getElementById("yourcode").value + '\nprint getMove(gameState)';
   console.log(prog);
   var mypre = document.getElementById("output"); 
   mypre.innerHTML = ''; 
   Sk.canvas = "mycanvas";
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead}); 
   eval(Sk.importMainWithBody("<stdin>",false,prog)); 
} 

function heartbeatListener(){
    socket.on('game_heartbeat',function(gameState){
        data = window.JSON.stringify(gameState);
        runit(data);
    });    
}
