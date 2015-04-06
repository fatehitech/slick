var fs = require('fs');

module.exports = ChatEvent;
function ChatEvent(path, time){
  this.path = path;
  this.time = time;
};


ChatEvent.prototype.toString = function() {
  return fs.readFileSync(this.path).toString();
}
