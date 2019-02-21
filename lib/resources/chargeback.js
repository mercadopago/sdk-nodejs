var requestManager = require('../request-manager');
var preferencesModel = require('../models/preferencesModel');

var preferences = module.exports = {
  schema: chargebackModel
};

chargeback.get = requestManager.describe({
  path: '/v1/chargebacks/:id',
  method: 'GET'
});

chargeback.findById = chargeback.get;
