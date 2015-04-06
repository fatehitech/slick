$(function() {
  var socket = io();
  $('form').submit(function(){
    var msg = $('#m').val().trim();
    if (msg.length >= 1) {
      socket.emit('chat message', msg);
      $('#m').val('');
    }
    return false;
  });
  socket.on('clear history', function() {
    $('#messages').empty();
  });
  socket.on('chat message', function(msg, options){
    options = options || {};
    var li = $('<li>');
    if (options.time) {
      li.text(options.time+' -- '+msg);
    } else {
      li.text(msg);
    }
    $('#messages').append(li);
  });
});
