var requestManager = require('../request-manager');
var cardTokenModel = require('../models/cardTokenModel');

var cardToken = module.exports = {
  schema: cardTokenModel
};

cardToken.get = requestManager.describe({
  path: '/v1/card_tokens/:id',
  method: 'GET'
});

cardToken.findById = cardToken.get;

cardToken.create = requestManager.describe({
  path: '/v1/card_tokens',
  method: 'POST'
});

cardToken.save = cardToken.create;
