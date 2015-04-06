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
        room.watcher.startWatching();
      }
      room.getRecentEvents(10, function(err, events) {
        if (err) throw err;
        io.emit('clear history');
        events.map(function(e) {
          io.emit('chat message', e.toString(), { time: e.time });
        });
      });
      socket.on('disconnect', function(){
        --self.connectionCount;
        if (room.watcher.watching && self.connectionCount === 0) {
          room.watcher.stopWatching();
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
