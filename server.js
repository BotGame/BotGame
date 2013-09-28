var io = require('socket.io');
var async = require('async');
var constants=require('./constants.js').constants;
var Sessions=require('./sessions.js').Sessions;

var ioObj;
var sessions;

function start(){
    async.series([
        function printStarting(next){
            console.log("Server starting...");
            next();
        },
        function setup(next){
            sessions=new Sessions();
            next();
        },
        function startHTTP(next){
            var server = http.createServer(function(req,res){/*TODO: Jong's Code Here*/}).listen(constants.port,function(){next();});
            ioObj=io.listen(server,{log:false}).on('connection',function(socket){
                socket.on('setup',function(data){
                    socket.emit(sessions.addSession());
                });
                socket.on('logout',function(data){
                    sessions.removeSession(data.sessionKey);
                });
                socket.on('command',function(data){
                    sessions.addSession(data.sessionKey,data.move,data.fire);
                });
            });
        },
        function startHeartbeat(next){
        },
        function printFinish(){
            console.log("Server started.");
            console.log("Listening at http://localhost:1759");
            console.log("Press Ctrl-c to stop.");
        },
    ])
}
