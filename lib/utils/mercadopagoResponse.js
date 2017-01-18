var Promise = require('bluebird');

// Private variables to hide them from the integrator
var requestManager;
var execOptions;

var mercadopagoResponse = function mercadopagoResponse(body, status, idempotencyId, pagination, options, requestManagerInjection) {
  this.body = body;
  this.status = status;
  this.idempotency = idempotencyId;
  this.pagination = pagination;

  execOptions = options;
  requestManager = requestManagerInjection;
};

/**
 * Execute next page request using the requestManager
 * @param callback
 */
mercadopagoResponse.prototype.next = function (callback) {
  var me = this;
  var error;

  return new Promise(function (resolve, reject) {
    if (!me.pagination) {
      error = new Error('This response doesnt support pagination');
      reject(error);
      return callback.apply(null, [error, null]);
    }

    // Setting the new limit and offset
    execOptions.config.qs.limit = me.pagination.limit;
    execOptions.config.qs.offset = me.pagination.offset + me.pagination.limit;

    return requestManager.generateAccessToken().then(function () {
      return requestManager.exec(execOptions);
    }).then(function (response) {
      resolve(response);
      return callback.apply(null, [null, response]);
    }).catch(function (err) {
      reject(err);
      return callback.apply(null, [err, null]);
    });
  });
};

/**
 * Check if it haves a next page
 * @returns {boolean}
 */
mercadopagoResponse.prototype.hasNext = function () {
  return ((this.pagination.offset + this.pagination.limit) < this.pagination.total);
};

/**
 * Get exec options
 * @returns {*}
 */
mercadopagoResponse.prototype.getExecOptions = function () {
  return execOptions;
};

module.exports = mercadopagoResponse;
