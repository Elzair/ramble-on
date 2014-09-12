var typeOf = require('typeof');

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);
  var tree = args[0], properties = args[1], value = args[2];

  if (typeOf(tree) !== 'object') {
    throw "Invalid tree!";
  }

  if (typeOf(properties) !== 'array') {
    throw "Invalid properties!";
  }

  var node = tree;
  var len = value === undefined ? properties.length : properties.length-1;

  for (var i=0; i<len; i++) {
    if (!(properties[i] in node)) {
      throw "Invalid property";
    }
    node = node[properties[i]];
  }

  if (value !== undefined) {
    node[properties[i]] = value;
  }
  else {
    return node;
  }
};
