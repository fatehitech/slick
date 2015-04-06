#!/bin/env/node
var args = require('minimist')(process.argv);
var PORT =  process.env.PORT || args.port || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ChatApp = require('./chat_app');

if (!args.roomDir) {
  throw new Error("Specify room directory --roomDir");
}

var chat_app = new ChatApp(io, {
  username: args.username || "New User",
  roomDir: args.roomDir
})

app.use(express.static(__dirname+'/public'));

http.listen(PORT, function(){
  console.log("Running at localhost:"+PORT);
});

