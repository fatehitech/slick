var fs = require('fs');
var path = require('path');

module.exports = ChatEvent;
function ChatEvent(fullpath, time){
  this.path = fullpath;
  this.name = path.basename(fullpath);
  var matches = this.name.match(/^(.+)\-\-(.+)\.(.+)$/);
  this.date = new Date(matches[1]);
  this.username = matches[2];
  this.time = time;
  this.type = matches[3];
};


ChatEvent.prototype.toString = function() {
  return fs.readFileSync(this.path).toString();
}
