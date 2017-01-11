var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    sinon = require('sinon');

describe('Validation Module', function(){
    var cacheManager = require('../lib/cache-manager');

    it('Save with invalid params', function(){
        assert.throws(cacheManager.save, 'You must provide hash and object to save');
        assert.throws(cacheManager.save.bind(cacheManager, 'hash'), 'You must provide hash and object to save');
        assert.throws(cacheManager.save.bind(cacheManager, undefined, {}), 'You must provide hash and object to save');
    });

    it('Generate Cache Key', function(){
        var hash = cacheManager.generateCacheKey('path', { header: 'test' }, { payload: true }, { filter: 'firstname' }),
            otherHash = cacheManager.generateCacheKey('path', { header: 'test' }, { payload: true }, { filter: 'lastname' });

        assert.isString(hash);
        assert.isString(otherHash);
        assert.notEqual(hash, otherHash, 'Should be a different hash because filter change');
    });

    it('Save Successfully', function(){
        var hash = cacheManager.generateCacheKey('path', { header: 'test' }, { payload: true }, { filter: 'firstname' }),
            toSave = {
                firstname: 'Ariel'
            };

        cacheManager.save(hash, toSave);

        assert.equal(Object.keys(cacheManager.cachedObjects).length, 1, 'The list needs to have the element persisted');

        var cachedObject = cacheManager.get(hash);

        assert.isObject(cachedObject);
        assert.equal(JSON.stringify(cachedObject), JSON.stringify(toSave));

        delete cacheManager.cachedObjects[hash];
    });

    it('Get not saved object on cache', function(){
        var cachedObject = cacheManager.get('');

        assert.isFalse(cachedObject);
    });
});