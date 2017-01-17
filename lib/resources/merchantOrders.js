var requestManager = require('../request-manager');
var merchantOrdersModel = require('../models/merchantOrdersModel');

var merchantOrders = module.exports = {
  schema: merchantOrdersModel
};

merchantOrders.create = requestManager.describe({
  path: '/merchant_orders',
  method: 'POST'
});

merchantOrders.update = requestManager.describe({
  path: '/merchant_orders/:id',
  method: 'PUT'
});

merchantOrders.get = requestManager.describe({
  path: '/merchant_orders/:id',
  method: 'GET'
});
