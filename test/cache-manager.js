var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var sinon = require('sinon');
var cacheManager = require('../lib/cache-manager');

describe('Validation Module', function () {
  it('Save with invalid params', function () {
    assert.throws(cacheManager.save, 'You must provide hash and object to save');
    assert.throws(cacheManager.save.bind(cacheManager, 'hash'), 'You must provide hash and object to save');
    assert.throws(cacheManager.save.bind(cacheManager, undefined, {}), 'You must provide hash and object to save');
  });

  it('Generate Cache Key', function () {
    var hash = cacheManager.generateCacheKey('path', {header: 'test'}, {filter: 'firstname'});
    var otherHash = cacheManager.generateCacheKey('path', {header: 'test'}, {filter: 'lastname'});

    assert.isString(hash);
    assert.isString(otherHash);
    assert.notEqual(hash, otherHash, 'Should be a different hash because filter change');
  });

  it('Save Successfully', function () {
    var cachedObject;
    var hash = cacheManager.generateCacheKey('path', {
      header: 'test'
    }, {
      filter: 'firstname'
    });
    var toSave = {
      firstname: 'Ariel'
    };

    cacheManager.save(hash, toSave);

    assert.isTrue(cacheManager.has(hash));

    cachedObject = cacheManager.get(hash);

    assert.isObject(cachedObject);
    assert.equal(JSON.stringify(cachedObject), JSON.stringify(toSave));

    delete cacheManager.cachedObjects[hash];
  });

  it('Get not saved object on cache', function () {
    var hash = '';
    var cachedObject = cacheManager.get(hash);

    assert.isUndefined(cachedObject);
    assert.isFalse(cacheManager.has(hash));
  });
});
