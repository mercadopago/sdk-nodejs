var Promise = require('bluebird');
var preConditions = require('../precondition');

// Private variables to hide them from the integrator
var requestManager;
var execOptions;

var mercadopagoError = function mercadopagoError(message, cause, status, idempotencyId, options, requestManagerInjection) {
  this.name = 'MercadoPagoError';
  this.message = message || 'Unknown Error';
  this.cause = cause || 'Unknown Cause';
  this.status = status || 500;
  this.idempotency = idempotencyId;

  execOptions = options;
  requestManager = requestManagerInjection;

  Error.captureStackTrace(this, mercadopagoError);
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

mercadopagoError.prototype = Object.create(Error.prototype);
mercadopagoError.prototype.constructor = mercadopagoError;

mercadopagoError.prototype.retry = function (callback) {
  var error;

  callback = preConditions.getCallback(callback);

  return new Promise(function (resolve, reject) {
    if (!execOptions && !requestManager) {
      error = new Error('Cant retry this operation');
      reject(error);
      return callback.apply(null, [error, null]);
    }

    // Retry the same request
    return executeRequest(resolve, reject, callback);
  });
};

module.exports = mercadopagoError;
