var typeOf = require('typeof');

module.exports = function(tree, properties) {
  if (typeOf(tree) !== 'object') {
    throw "Invalid tree!";
  }

  if (typeOf(properties) !== 'array') {
    throw "Invalid properties!";
  }

  var node = tree;

  for (var i=0; i<properties.length; i++) {
    if (!(properties[i] in node)) {
      throw "Invalid property";
    }
    node = node[properties[i]];
  }

  return node;
};

