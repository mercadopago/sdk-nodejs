var requestManager = require('../request-manager');
var refundModel = require('../models/refundModel');

var refund = module.exports = {
  schema: refundModel
};

refund.all = requestManager.describe({
  path: '/v1/payments/:payment_id/refunds',
  method: 'GET'
});

refund.create = requestManager.describe({
  path: '/v1/payments/:payment_id/refunds',
  method: 'POST'
});

refund.save = refund.create;
