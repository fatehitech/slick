module.exports = Watcher;
function Watcher(){
  this.watching = false;
};

Watcher.prototype.startWatching = function() {
  console.log('+w');
  this.watching = true;
}

Watcher.prototype.stopWatching = function() {
  console.log('-w');
  this.watching = false;
}
