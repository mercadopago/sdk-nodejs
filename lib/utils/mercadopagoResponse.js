var Promise = require('bluebird');
var configurations = require('../configurations');
var preConditions = require('../precondition');

// Private variables to hide them from the integrator
var requestManager;
var execOptions;

var mercadopagoResponse = function mercadopagoResponse(body, status, idempotencyId, pagination, options, requestManagerInjection) {
  this.body = body;
  this.response = this.body;
  this.status = status;
  this.idempotency = idempotencyId;
  this.pagination = pagination;

  execOptions = options;
  requestManager = requestManagerInjection;
};

/*
 * Execute request using the requestManager and execOptions
 * @param resolve
 * @param reject
 * @param callback
 * @returns {*}
 */
var executeRequest = function (resolve, reject, callback) {
  callback = preConditions.getCallback(callback);

  return requestManager.generateAccessToken().then(function () {
    return requestManager.exec(execOptions);
  }).then(function (response) {
    resolve(response);
    return callback.apply(null, [null, response]);
  }).catch(function (err) {
    reject(err);
    return callback.apply(null, [err, null]);
  });
};

/*
 * Execute previous page request using the requestManager
 * @param callback
 */
mercadopagoResponse.prototype.prev = function (callback) {
  var error;

  callback = preConditions.getCallback(callback);

  return new Promise(function (resolve, reject) {
    var previousPage;

    if (!this.pagination) {
      error = new Error('This response doesnt support pagination');
      reject(error);
      return callback.apply(null, [error, null]);
    }

    // Set previous page
    previousPage = this.pagination.offset - this.pagination.limit;

    // Setting the new limit and offset
    execOptions.config.qs.limit = this.pagination.limit;
    execOptions.config.qs.offset = (previousPage >= 0) ? previousPage : 0;

    return executeRequest(resolve, reject, callback);
  }.bind(this));
};

/*
 * Execute next page request using the requestManager
 * @param callback
 */
mercadopagoResponse.prototype.next = function (callback) {
  var error;

  callback = preConditions.getCallback(callback);

  return new Promise(function (resolve, reject) {
    if (!this.pagination) {
      error = new Error('This response doesnt support pagination');
      reject(error);
      return callback.apply(null, [error, null]);
    }

    // Setting the new limit and offset
    execOptions.config.qs.limit = this.pagination.limit;
    execOptions.config.qs.offset = this.pagination.offset + this.pagination.limit;

    return executeRequest(resolve, reject, callback);
  }.bind(this));
};

/*
 * Check if it haves a previous page
 * @returns {boolean}
 */
mercadopagoResponse.prototype.hasPrev = function () {
  return (this.pagination && (this.pagination.offset > 0));
};

/*
 * Check if it haves a next page
 * @returns {boolean}
 */
mercadopagoResponse.prototype.hasNext = function () {
  return (this.pagination && ((this.pagination.offset + this.pagination.limit) < this.pagination.total));
};

/*
 * Get exec options
 * @returns {*}
 */
mercadopagoResponse.prototype.getExecOptions = function () {
  return execOptions;
};

module.exports = mercadopagoResponse;
