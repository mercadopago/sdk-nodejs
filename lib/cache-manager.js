var objectHash = require('object-hash');
var LRUCache = require('stale-lru-cache');

var cacheManager = module.exports = {
  lru: new LRUCache(),
  algorithm: 'md5',
  encoding: 'base64',
  cachedObjects: {}
};

/**
 * Save object on memory cache
 * @param hash
 * @param toSave
 */
cacheManager.save = function (hash, toSave, options) {
  if (!hash || !toSave) throw new Error('You must provide hash and object to save');
  this.lru.set(hash, toSave, options);
};

/**
 * Check if the object is on cache
 * @param hash
 */
cacheManager.has = function (hash) {
  return this.lru.has(hash);
};

/**
 * Get object on memory cache
 * @param hash
 * @returns {*}
 */
cacheManager.get = function (hash) {
  return this.lru.get(hash);
};

/**
 * Generate hash string (MD5)
 * @param obj
 * @returns {*}
 */
cacheManager.generateCacheKey = function (path, headers, querystring) {
  return objectHash({
    path: path,
    headers: headers,
    querystring: querystring
  }, {
    algorithm: this.algorithm,
    encoding: this.encoding
  });
};
