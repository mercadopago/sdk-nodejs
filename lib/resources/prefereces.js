var requestManager = require('../request-manager');

var preferences = module.exports = {
    schema: require('../models/preferencesModel')
};

preferences.create = requestManager.describe({
    path: '/checkout/preferences',
    method: 'POST'
});

preferences.update = requestManager.describe({
    path: '/checkout/preferences/:id',
    method: 'PUT'
});

preferences.get = requestManager.describe({
    path: '/checkout/preferences/:id',
    method: 'GET'
});