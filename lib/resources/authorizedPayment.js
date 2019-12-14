var requestManager = require('../request-manager');
var authorizedPaymentModel = require('../models/authorizedPaymentModel');
var preConditions = require('../precondition');

var authorizedPayment = module.exports = {
  schema: authorizedPaymentModel
};

authorizedPayment.create = requestManager.describe({
  path: '/authorized_payments',
  method: 'POST'
});

authorizedPayment.save = authorizedPayment.create;

authorizedPayment.update = requestManager.describe({
  path: '/authorized_payments/:id',
  method: 'PUT'
});

authorizedPayment.get = requestManager.describe({
  path: '/authorized_payments/:id',
  method: 'GET'
});

authorizedPayment.findById = authorizedPayment.get;

authorizedPayment.search = requestManager.describe({
  path: '/authorized_payments/search',
  method: 'GET'
});
