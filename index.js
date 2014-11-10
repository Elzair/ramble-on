var typeOf = require('typeof');

var isInt = function(value) {
  if (typeOf(value) !== 'number') {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
};

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);
  var tree = args[0];
  var properties = args[1];
  var value = args[2];
  var createProperties = args[3] || false;

  if (typeOf(tree) !== 'object' && typeOf(tree) !== 'array') {
    throw "Invalid tree!";
  }

  if (typeOf(properties) !== 'array') {
    throw "Invalid properties!";
  }

  var node = tree;
  var len = value === undefined ? properties.length : properties.length-1;

  for (var i=0; i<len; i++) {
    if (!(properties[i] in node)) {
      if (!createProperties) {
        throw "Invalid property";
      }
      console.log(parseInt(properties[i+1], 10));
      node[properties[i]] = isInt(properties[i+1]) ? [] : {};
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
