var requestManager = require('../request-manager');
var collectionsModel = require('../models/collectionsModel');

var collections = module.exports = {
  schema: collectionsModel,
  idempotency: true,
  refunds: {}
};

collections.get = requestManager.describe({
  path: '/collections/:id',
  method: 'GET'
});

collections.findById = collections.get;

collections.put = requestManager.describe({
  path: '/collections/:id',
  method: 'PUT'
});

collections.search = requestManager.describe({
  path: '/collections/search',
  path_sandbox_prefix: true,
  method: 'GET'
});

collections.refunds.post = requestManager.describe({
  path: '/collections/:id/refunds',
  method: 'POST'
});
