#!/bin/env/node
var args = require('minimist')(process.argv);
var PORT =  process.env.PORT || args.port || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'));

io.on('connection', function(socket){
  console.log('a user connected');
  // send an init object with last 10 events
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    // write new event file with the given chat text
  });
});

http.listen(PORT, function(){
  console.log("Running at localhost:"+PORT);
});

// start the sync agent
// it requires a directory that we expect to be synced with others outside the system
// we will be watching this directory and updating our indices as needed
// e.g. adding a "last timestamp" sort of thing so we arent watching too many files at once
