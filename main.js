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
    li.text(options.username+': '+msg);
  } else {
    li.text(msg);
  }
  $('#messages').append(li);
});

var app = new ChatApp(io, {
  username: "New User"
})

var joinRoom = function(room) {
  localStorage.room = room;
  app.setupRoom(room, function(err) {
    if (err) $('#status').text(err.message);
    console.log("joined room "+room);
  })
}

var room = localStorage.room;
if (room) joinRoom(room);

$('#set-name').click(function(e) {
  app.setUsername(prompt('Enter your name') || "Anonymous")
  return false;
});

$('input#room').change(function(e) {
  joinRoom(e.target.value);
});
