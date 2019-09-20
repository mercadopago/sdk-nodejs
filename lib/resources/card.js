var requestManager = require('../request-manager');
var cardModel = require('../models/cardModel');

var card = module.exports = {
  schema: cardModel
};

card.all = requestManager.describe({
  path: '/v1/customers/:customer_id/cards',
  method: 'GET'
});

card.get = requestManager.describe({
  path: '/v1/customers/:customer_id/cards/:id',
  method: 'GET'
});

card.findById = card.get;

card.create = requestManager.describe({
  path: '/v1/customers/:customer_id/cards',
  method: 'POST'
});

card.save = card.create;

card.update = requestManager.describe({
  path: '/v1/customers/:customer_id/cards',
  method: 'PUT'
});

card.delete = requestManager.describe({
  path: '/v1/customers/:customer_id/cards/:id',
  method: 'DELETE'
});
