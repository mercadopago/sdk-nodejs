var requestManager = require('../request-manager');
var customerModel = require('../models/customersModel');

var customers = module.exports = {
  schema: customerModel,
  cards: {}
};

customers.search = requestManager.describe({
  path: '/v1/customers/search',
  method: 'GET'
});

customers.create = requestManager.describe({
  path: '/v1/customers',
  method: 'POST'
});

customers.save = customers.create;

customers.update = requestManager.describe({
  path: '/v1/customers/:id',
  method: 'PUT'
});

customers.get = requestManager.describe({
  path: '/v1/customers/:id',
  method: 'GET'
});

customers.findById = customers.get;

customers.remove = requestManager.describe({
  path: '/v1/customers/:id',
  method: 'DELETE'
});

customers.cards.all = requestManager.describe({
  path: '/v1/customers/:id/cards',
  method: 'GET'
});

customers.cards.create = requestManager.describe({
  path: '/v1/customers/:id/cards',
  method: 'POST'
});

customers.cards.save = customers.cards.create;

customers.cards.update = requestManager.describe({
  path: '/v1/customers/:id/cards/:card_id',
  method: 'PUT'
});

customers.cards.get = requestManager.describe({
  path: '/v1/customers/:id/cards/:card_id',
  method: 'GET'
});

customers.cards.findById = customers.cards.get;

customers.cards.delete = requestManager.describe({
  path: '/v1/customers/:id/cards/:card_id',
  method: 'DELETE'
});
