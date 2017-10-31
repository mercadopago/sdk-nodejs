var requestManager = require('../request-manager');
var moneyRequestsModel = require('../models/moneyRequestsModel');

var moneyRequests = module.exports = {
  schema: moneyRequestsModel
};

moneyRequests.create = requestManager.describe({
  path: '/money_requests',
  method: 'POST'
});

moneyRequests.save = moneyRequests.create;

moneyRequests.get = requestManager.describe({
  path: '/money_requests/:id',
  method: 'GET'
});

moneyRequests.findById = moneyRequests.get;