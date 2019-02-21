var requestManager = require('../request-manager');
var chargebacksModel = require('../models/chargebacksModel');

var preferences = module.exports = {
  schema: chargebacksModel
};

chargeback.get = requestManager.describe({
  path: '/v1/chargebacks/:id',
  method: 'GET'
});

chargeback.findById = chargeback.get;
