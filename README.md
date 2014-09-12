ramble-on
=========

**ramble-on** is your one-stop property returning shop!

Why should you use it?
----------------------

A good question! Let's say you have are working with a really big Javascript object.

```javascript
var big_object = {
    foo: {
        bar: {
            baz: {
                main: [
                  "test"
                ]
              , niam: 3
            }
          , zab: false
        }
      , rab: null
    }
  , oof: [
      2
    ]
};
```

Let's also say that you want to return or set any arbitrary value in that object. At first, it may seem easy.

```javascript
var x = big_object.foo.bar.baz.main[0]; // returns "test"
```

However, what if the exact structure of the object is hard to determine at "compile" time?

```javascript
big_object.foo.bar = "Hello";
var x = big_object.foo.bar.baz.main[0]; // throws Error because of invalid property
```

In these cases, it would be nice to have a way to programmatically specify property access. You could start by creating a function that uses `eval()` to dynamically create a retrieval statement for a given object and properties array.

```javascript
function get_property(object, properties) {
  var prop;
  eval("prop = object[" + properties.join("][") + "];");
  return prop;
}
```

However, [you should not use eval (most of the time anyway)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Don.27t_use_eval.21). Also, you would need to create another function to set properties!

There **has** to be a better way!

Enter ramble-on...
------------------

**ramble-on** makes it easy to retrieve and set properties on nearly any object. You just call it with the object you want to traverse and an array of strings and integers representing the location of the object.

**Example:**
```javascript
var ramble = require('ramble-on');

var object = big_object; // i.e. the object from the first code snippet
var property = ramble(object, ["foo", "bar", "baz"]);
console.log(JSON.stringify(property, null, 2));
```

**Output:**
```javascript
{
  "main": [
   "test"
  ],
  "niam": 3
}
```

You can even set properties as well. Just add one parameter: the value to set

**Example**:
```javascript
ramble(object, ["foo", "bar"], "Hello");
console.log(JSON.stringify(object, null, 2));
```

**Output:**
```javascript
{
  "foo": {
    "bar": "Hello",
    "rab": null
  },
  "oof": [
    2
  ]
}
```

Heck, you can even handle circular dependencies!

**Example:**
```javascript
var object = big_object; // NOTE: If you are following along, you might want to reset big_object.
ramble(object, ["foo", "bar", "baz", "main", 1], object);
var prop = ramble(object, ["foo", "bar", "baz", "main", 1, "oof", 0]);
console.log(prop); // Outputs: 2
```

Get ramble-on today!
--------------------

How much would you pay for such a useful library? 500 dollars? 5,000 dollars?! ONE MILLION DOLLARS?!!!!

Well, you can pay $0 because **ramble-on** is released as [Free Libre Open-Source Software](https://www.gnu.org/philosophy/free-sw.html) under the terms of the [MIT License](http://opensource.org/licenses/MIT). Copy it; share it; put it in a blender! Do all three at once!

Start using this sexy-cool library today by rambling to the root directory of your project and typing `npm install ramble-on --save` into the *nix console of your choice! (Requires: [node.js](http://nodejs.org/); other options coming soon).
