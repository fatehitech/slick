var chokidar = require('chokidar');
var fs = require('fs');
var ChatEvent = require('./chat_event');

module.exports = Watcher;
function Watcher(dir){
  this.dir = dir;
  this.watcher = null;
  this.watching = false;
};

Watcher.prototype.startWatching = function(emit) {
  this.watching = true;
  this.watcher = chokidar.watch(this.dir, {
    ignored: /[\/\\]\./,
    persistent: true
  });
  var self = this;
  this.watcher.on('ready', function() {
    self.watcher.on('add', function(path) {
      var modTime = fs.statSync(path).mtime.getTime();
      emit(new ChatEvent(path, modTime));
    });
  });
}

Watcher.prototype.stopWatching = function() {
  this.watcher.close();
  this.watcher = null;
  this.watching = false;
}
