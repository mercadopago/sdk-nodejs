var requestManager = require('../request-manager');

var preapproval = module.exports = {
    schema: require('../models/preapprovalModel')
};

preapproval.create = requestManager.describe({
    path: '/preapproval',
    method: 'POST'
});

preapproval.update = requestManager.describe({
    path: '/preapproval/:id',
    method: 'PUT'
});

preapproval.get = requestManager.describe({
    path: '/preapproval/:id',
    method: 'GET'
});

preapproval.search = requestManager.describe({
    path: '/preapproval/search',
    method: 'GET'
});