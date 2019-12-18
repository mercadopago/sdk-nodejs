var requestManager = require('../request-manager');
var preferencesModel = require('../models/preferencesModel');

var preferences = module.exports = {
  schema: preferencesModel,
  partnersHeaders: true
};

preferences.create = requestManager.describe({
  path: '/checkout/preferences',
  method: 'POST'
});

preferences.save = preferences.create;

preferences.update = requestManager.describe({
  path: '/checkout/preferences/:id',
  method: 'PUT'
});

preferences.get = requestManager.describe({
  path: '/checkout/preferences/:id',
  method: 'GET'
});

preferences.findById = preferences.get;
