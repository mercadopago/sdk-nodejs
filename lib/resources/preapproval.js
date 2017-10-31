var requestManager = require('../request-manager');
var preapprovalModel = require('../models/preapprovalModel');
var preConditions = require('../precondition');

var preapproval = module.exports = {
  schema: preapprovalModel
};

preapproval.create = requestManager.describe({
  path: '/preapproval',
  method: 'POST'
});

preapproval.save = preapproval.create;

preapproval.update = requestManager.describe({
  path: '/preapproval/:id',
  method: 'PUT'
});

preapproval.get = requestManager.describe({
  path: '/preapproval/:id',
  method: 'GET'
});

preapproval.findById = preapproval.get;

preapproval.search = requestManager.describe({
  path: '/preapproval/search',
  method: 'GET'
});

/**
 * Cancel a prepparoval
 * @param id
 * @param callback
 * @returns {*}
 */
preapproval.cancel = function (id, callback) {
  var preapprovalId = (typeof arguments[0] === 'object') ? arguments[0].id : arguments[0];

  callback = preConditions.getCallback(callback);

  return this.update({
    id: preapprovalId,
    status: 'cancelled'
  }, callback);
};

/**
 * Pause a preapproval
 * @param id
 * @param callback
 * @returns {*}
 */
preapproval.pause = function (id, callback) {
  var preapprovalId = (typeof arguments[0] === 'object') ? arguments[0].id : arguments[0];

  callback = preConditions.getCallback(callback);

  return this.update({
    id: preapprovalId,
    status: 'paused'
  }, callback);
};
