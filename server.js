var io = require('socket.io');
var async = require('async');
var http = require('http');
var constants=require('./constants.js').constants;
var Sessions=require('./sessions.js').Sessions;
var World=require('./game.js').World;

var ioObj;
var sessions;
var world;

function start(){
    async.series([
        function printStarting(next){
            console.log("Server starting...");
            next();
        },
        function setup(next){
            sessions=new Sessions();
            world=new World(sessions);
            next();
        },
        function startHTTP(next){
            var server = http.createServer(function(req,res){/*TODO: Jong's Code Here*/}).listen(constants.port,function(){next();});
            ioObj=io.listen(server,{log:false}).on('connection',function(socket){
                socket.on('setup',function(data){
                    var sessionKey=sessions.addSession()
                    socket.emit('sessionKey',sessionKey);
                    world.addPlayer(sessionKey);
                });
                socket.on('logout',function(data){
                    sessions.removeSession(data.sessionKey);
                    world.removePlayer(data.sessionKey);
                });
                socket.on('command',function(data){
                    sessions.setCmd(data.sessionKey,data.move,data.fire);
                });
            });
        },
        function startHeartbeat(next){
            setTimeout(function(){
                state = world.step();
                ioObj.sockets.emit('game_heartbeat',{state:state});
            },constants.heartbeatPeriod);
            next();
        },
        function printFinish(){
            console.log("Server started.");
            console.log("Listening at http://localhost:1759");
            console.log("Press Ctrl-c to stop.");
        },
    ])
}
exports.start=start;
