var typeOf = require('typeof');

exports.get_node = function(tree, properties) {
  if (typeOf(tree) !== 'object') {
    throw "Invalid tree: " + tree;
  }

  if (typeOf(properties) !== 'array') {
    throw "Invalid array: " + properties;
  }

  var node = tree;

  for (var i=0; i<properties.length; i++) {
    node = node[properties[i]];
  }

  return node;
};

