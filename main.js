var ChatApp = require('./chat_app');

var EventEmitter = require('events').EventEmitter;
var io = new EventEmitter();

$('form').submit(function(){
  var msg = $('#m').val().trim();
  if (msg.length >= 1) {
    io.emit('user input', msg);
    $('#m').val('');
  }
  return false;
});

io.on('clear history', function() {
  $('#messages').empty();
});

io.on('chat message', function(msg, options){
  options = options || {};
  var li = $('<li>');
  if (options.time) {
    li.text(options.time+' -- '+msg);
  } else {
    li.text(msg);
  }
  $('#messages').append(li);
});

var app = new ChatApp(io, {
  username: "New User"
})

/*
/Users/keyvan/Dropbox/slick/fatehitech/some_room
*/

$('#room-input').submit(function(e) {
  var room = e.target.room.value;
  app.setupRoom(room, function(err) {
    if (err) $('#status').text(err.message);
  })
});
