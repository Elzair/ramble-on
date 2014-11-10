var assert = require('assert')
  , expect = require('chai').expect 
  , ramble = require(__dirname + '/../')
  ;

describe('ramble-on', function() {
  var object = null;

  beforeEach(function() {
    object = {foo: {bar: {baz: ["test"]}}};
  });

  it('should return the correct property if no value was specified', function() {
    //assert.strictEqual(ramble(object, ["foo", "bar", "baz", 0]), "test");
    var result = ramble(object, ["foo", "bar", "baz", 0]);
    expect(result).to.be.a('string');
    expect(result).to.equal('test');
  });

  it('should set the property to the given value', function() {
    ramble(object, ["foo", "bar"], "another test");
    //assert.strictEqual(ramble(object, ["foo", "bar"]), "another test");
    var result = ramble(object, ["foo", "bar"]);
    expect(result).to.equal("another test");
  });

  it('should return the tree if properties is an empty array', function() {
    //assert.deepEqual(ramble(object, []), {foo: {bar: {baz: ["test"]}}});
    var result = ramble(object, []);
    expect(result).to.be.an('object');
    expect(result).to.deep.equal({foo: {bar: {baz: ["test"]}}});
  });

  it('should handle circular dependencies', function() {
    object.foo.bar.baz[1] = object;
    object.test = 42;
    //assert.strictEqual(ramble(object, ["foo", "bar", "baz", 1, "test"]), 42);
    var result = ramble(object, ["foo", "bar", "baz", 1, "test"]);
    expect(result).to.equal(42);
  });

  it('should throw an error on an invalid tree parameter', function() {
    //try {
    //  var x = ramble(42, ["foo"]);
    //}
    //catch (err) {
    //  assert(err.match(/Invalid tree/));
    //}
    var fn = function() { ramble(42, ["foo"]); };
    expect(fn).to.throw(/Invalid tree/);
  });

  it('should throw an error on an invalid properties parameter', function() {
    //try {
    //  var x = ramble(object, 42);
    //}
    //catch (err) {
    //  assert(err.match(/Invalid properties/));
    //}
    var fn = function() { ramble(object, 42); };
    expect(fn).to.throw(/Invalid properties/);
  });

  it('should throw an error on an invalid property chain', function() {
    //try {
    //  var x = ramble(object, ['baz']);
    //}
    //catch (err) {
    //  assert(err.match(/Invalid property/));
    //}
    var fn = function() { ramble(object, ['baz']); };
    expect(fn).to.throw(/Invalid property/);
  });

  it('should allow the top object to be an array', function () {
    object = [{foo: {bar: {baz: ["test"]}}}];
    var result = ramble(object, [0, "foo", "bar", "baz", 0]);
    expect(result).to.equal('test');
  });

  it('should create a blank property instead of throwing an error when createProperty is true', function () {
    ramble(object, ['fizz', 'buzz'], 15, true);
    expect(object).to.have.deep.property('fizz.buzz', 15);
  });

  it('should create a blank array when createProperty is specified and the next property name parses to an integer', function () {
    ramble(object, ['fizz', 0], 'buzz', true);
    expect(object).to.have.deep.property('fizz[0]', 'buzz');
    expect(object.fizz).to.be.an('array');
  });
});
