var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Watcher = require('./watcher');

module.exports = Room;
function Room(dir){
  this.dir = dir;
  this.name = path.basename(dir)
  this.watcher = new Watcher()
};

Room.prototype.setup = function(cb) {
  if ( ! fs.existsSync(this.dir)) {
    mkdirp(this.dir, cb);
  } else cb();
}

Room.prototype.getRecentEvents = function(count, cb) {
  cb([]);
}

Room.prototype.addTextEvent = function(username, msg) {
  var date = new Date().toJSON();
  var fname = date+'|'+username+".txt"
  this.addEvent(fname, msg);
}

Room.prototype.addEvent = function(fname, content) {
  var fpath = path.join(this.dir, fname);
  fs.writeFile(fpath, content, function(err) {
    if (err) throw err;
  })
}
