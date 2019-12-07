var requestManager = require('../request-manager');
var planModel = require('../models/planModel');
var preConditions = require('../precondition');

var plan = module.exports = {
  schema: planModel
};

plan.create = requestManager.describe({
  path: '/v1/plans',
  method: 'POST'
});

plan.save = plan.create;

plan.update = requestManager.describe({
  path: '/v1/plans/:id',
  method: 'PUT'
});

plan.get = requestManager.describe({
  path: '/v1/plans/:id',
  method: 'GET'
});

plan.findById = plan.get;

/**
 * Cancel a plan
 * @param id
 * @param callback
 * @returns {*}
 */
plan.cancel = function (id, callback) {
  var planId = (typeof arguments[0] === 'object') ? arguments[0].id : arguments[0];

  callback = preConditions.getCallback(callback);

  return this.update({
    id: planId,
    status: 'cancelled'
  }, callback);
};

/**
 * Pause a plan
 * @param id
 * @param callback
 * @returns {*}
 */
plan.pause = function (id, callback) {
  var planId = (typeof arguments[0] === 'object') ? arguments[0].id : arguments[0];

  callback = preConditions.getCallback(callback);

  return this.update({
    id: planId,
    status: 'paused'
  }, callback);
};
