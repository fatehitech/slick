var fs = require('fs');
var path = require('path');
var Watcher = require('./watcher');
var _ = require('lodash');

var ChatEvent = require('./chat_event');

module.exports = Room;
function Room(dir){
  this.dir = dir;
  this.name = path.basename(dir);
  this.watcher = new Watcher(dir);
};

Room.prototype.setup = function(cb) {
  if ( ! fs.existsSync(this.dir))
    return cb(new Error('No such directory'));
  else return cb();
}

/* Most recent event is last in the array */
Room.prototype.getRecentEvents = function(count, cb) {
  var dir = this.dir;
  return fs.readdir(dir, function(err, res) {
    if (err) return cb(err);
    var out = _(res).map(function(v) { 
      var filePath = path.join(dir,v);
      var stats = fs.statSync(filePath);
      var modTime = stats.mtime.getTime();
      return { path:filePath, time: modTime, isFile: stats.isFile() }; 
    }).reject(function(e) {
      return !e.isFile;
    }).sort(function(a, b) { return a.time - b.time; });
    if (count > 0) out = out.takeRight(count);
    out = out.map(function(e) { return new ChatEvent(e.path, e.time) });
    return cb(err, out.value());
  })
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
