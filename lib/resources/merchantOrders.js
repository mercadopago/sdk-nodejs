var requestManager = require('../request-manager');

var merchantOrders = module.exports = {
    schema: require('../models/merchantOrdersModel')
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