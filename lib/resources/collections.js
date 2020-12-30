var requestManager = require('../request-manager');
var collectionsModel = require('../models/collectionsModel');

/**
  * Collections Class
  * @namespace collections
 */
var collections = module.exports = {
  schema: collectionsModel,
  idempotency: true,
  refunds: {}
};

/**
 * Get collection for provided id
 * @function get
 * @param {string} id Collection id
 * @memberof collections
 */
collections.get = requestManager.describe({
  path: '/collections/:id',
  method: 'GET'
});

collections.findById = collections.get;

collections.put = requestManager.describe({
  path: '/collections/:id',
  method: 'PUT'
});

/**
 * Get all collection
 * @function search
 * @memberof collections
 */
collections.search = requestManager.describe({
  path: '/collections/search',
  path_sandbox_prefix: true,
  method: 'GET'
});

/**
 * Collection ID Refund
 * @function refunds
 * @memberof collections
 */
collections.refunds.post = requestManager.describe({
  path: '/collections/:id/refunds',
  method: 'POST'
});
