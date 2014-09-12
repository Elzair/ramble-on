var assert = require('assert')
  , ramble = require(__dirname + '/../')
  ;

describe('ramble-on', function() {
  var object = null;

  beforeEach(function() {
    object = {foo: {bar: {baz: ["test"]}}};
  });

  it('should return the correct property if no value was specified', function() {
    assert.strictEqual(ramble(object, ["foo", "bar", "baz", 0]), "test");
  });

  it('should set the property to the given value', function() {
    ramble(object, ["foo", "bar"], "another test");
    assert.strictEqual(ramble(object, ["foo", "bar"]), "another test");
  });

  it('should return the tree if properties is an empty array', function() {
    assert.deepEqual(ramble(object, []), {foo: {bar: {baz: ["test"]}}});
  });

  it('should handle circular dependencies', function() {
    object.foo.bar.baz[1] = object;
    object.test = 42;
    assert.strictEqual(ramble(object, ["foo", "bar", "baz", 1, "test"]), 42);
  });

  it('should throw an error on an invalid tree parameter', function() {
    try {
      var x = ramble(42, ["foo"]);
    }
    catch (err) {
      assert(err.match(/Invalid tree/));
    }
  });

  it('should throw an error on an invalid properties parameter', function() {
    try {
      var x = ramble(object, 42);
    }
    catch (err) {
      assert(err.match(/Invalid properties/));
    }
  });

  it('should throw an error on an invalid property chain', function() {
    try {
      var x = ramble(object, ['baz']);
    }
    catch (err) {
      assert(err.match(/Invalid property/));
    }
  })
});
