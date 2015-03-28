var Room = require('./room');

module.exports = ChatApp;
function ChatApp(io, config){
  var room = new Room(config.roomDir);
  this.connectionCount = 0;
  var self = this;
  room.setup(function(err) {
    if (err) throw err;
    io.on('connection', function(socket){
      ++self.connectionCount;
      if (! room.watcher.watching) {
        room.startWatching();
      }
      room.getRecentEvents(10, function(events) {
        io.emit('clear history');
        io.emit('events', events);
      });
      socket.on('disconnect', function(){
        --self.connectionCount;
        if (room.watcher.watching && self.connectionCount === 0) {
          room.stopWatching();
        }
      });
    });

    io.on('connection', function(socket){
      socket.on('chat message', function(msg){
        room.addTextEvent(config.username, msg);
      });
    });
  });
};
