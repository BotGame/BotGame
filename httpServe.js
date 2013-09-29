var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require('querystring');
var path= require('path');

exports.onRequest=function(request,response) {
    var pathname;
    if (path.basename(request.url) == "" || path.basename(request.url) == "/") {
        pathname="./assets/html/index.html"
    }else {
        var pathext = path.extname(request.url).slice(1,path.extname(request.url).length);
        pathname="./assets/" + pathext + "/" + path.basename(request.url) + "";
    }
    console.log(pathname);
    fs.readFile(pathname, function(error, data) {
        if (error){
            console.log("WHAT THE FUCK ARE YOU DOING?");
        }else{
            if (request.url == "/") {response.writeHeader("200",{"Content-Type": "text/html"});}
            else {response.writeHeader("200", {"Content-Type": "text/" + path.extname(request.url).slice(1,path.extname(request.url).length)});}
            response.write(data);
            response.end();
        }              
    });
}
