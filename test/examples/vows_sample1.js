var vows = require('vows'),
  assert = require('assert'),
  Foo = require('../../lib/foo');

vows.describe('foo').addBatch({
  'Foo':{
    topic:new Foo.Foozer(),
    'returns "work done" when doWork()':function (f) {
      assert.equal(f.doWork(), "work done");
      // assert.equal(true, false);  // uncomment to see failing test.
    }
  }
}).run();

