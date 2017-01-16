var hash = require('object-hash');

var cacheManager = module.exports = {
    algorithm: 'md5',
    encoding: 'base64',
    cachedObjects: {}
};

/**
 * Save object on memory cache
 * @param toHash
 * @param toSave
 */
cacheManager.save = function(hash, toSave){
    if(!hash || !toSave) throw new Error('You must provide hash and object to save');
    this.cachedObjects[hash] = toSave;
};

/**
 * Get object on memory cache
 * @param toFind
 * @returns {*|boolean}
 */
cacheManager.get = function(hash){
    return this.cachedObjects[hash] || false;
};

/**
 * Generate hash string (MD5)
 * @param obj
 * @returns {*}
 */
cacheManager.generateCacheKey = function(path, headers, querystring){
    return hash({ path: path, headers: headers, querystring: querystring }, { algorithm: this.algorithm, encoding: this.encoding });
};