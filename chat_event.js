var fs = require('fs');

module.exports = ChatEvent;
function ChatEvent(path, time){
  this.path = path;
  this.time = time;
  this.type = "txt";
};


ChatEvent.prototype.toString = function() {
  return fs.readFileSync(this.path).toString();
}
