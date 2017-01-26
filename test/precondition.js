/* eslint-env node, mocha */
var chai = require('chai');
var assert = chai.assert;
var preConditionModule = require('../lib/precondition');

describe('Validation Module', function () {
  var testFunction = function () {};

  it('With Function', function () {
    var callback;

    callback = preConditionModule.getCallback(testFunction);

    assert.equal(callback, testFunction);
  });

  it('Without Function', function () {
    var callback;

    callback = preConditionModule.getCallback(undefined);

    assert.typeOf(callback, 'function');
  });
});
