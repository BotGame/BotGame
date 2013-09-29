var http=require('http');
var fs=require('fs');
var url=require('url');

function start(){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        console.log(pathname);
    }
    http.createServer(onRequest).listen(8888);
}
start()
