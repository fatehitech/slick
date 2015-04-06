var Room = require('./room');

module.exports = ChatApp;
function ChatApp(io, config){

  var emitEvent = function(e) {
    if (e.type === "txt") {
      io.emit('chat message', e.toString(), { time: e.time });
    } else {
      io.emit('chat message', "unknown event type!");
    }
  }

  this.setupRoom = function(roomDir, cb) {
    var room = new Room(roomDir);
    return room.setup(function(err) {
      if (err) return cb(err);
      if (! room.watcher.watching) {
        room.watcher.startWatching(emitEvent);
      }
      room.getRecentEvents(10, function(err, events) {
        if (err) throw err;
        io.emit('clear history');
        events.map(emitEvent);
      });

      io.on('user input', function(msg){
        room.addTextEvent(config.username, msg);
      });
      cb(null, room);
    });
  }
};
