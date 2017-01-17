var request = require('request');
var Promise = require('bluebird');
var uuid = require('uuid');
var configurations = require('./configurations');
var MercadopagoResponse = require('./utils/mercadopagoResponse');
var MercadoPagoError = require('./utils/mercadopagoError');
var validation = require('./validation');

var requestManager = module.exports = {
  JSON_MIME_TYPE: 'application/json',
  FORM_MIME_TYPE: 'application/x-www-form-urlencoded'
};

/**
 * Creates a dynamic function depending on the options that are send by the resources
 * @param options
 * @returns {Function}
 */
requestManager.describe = function (options) {
  var mainContext = this;

  // This method will have the context of the class that is calling this (Will have the context of the class)
  return function () {
    var me = this;
    var calledArgs = arguments;

    return new Promise(function (resolve, reject) {
      var callback = calledArgs[calledArgs.length - 1]; // Last argument will always be the callback
      var config = {};
      var payload = {};
      var error;
      var pathParameters = options.path.match(/(:[a-z|A-Z|_|-]*)/g) || []; // Get the path parameters from path
      var totalFunctionParams;
      var haveConfig = false;
      var missingPayloadProperties = []; // If it is a POST, PUT, the path variables must come from JSON
      var schema = me.schema;
      var needIdempotency = !!me.idempotency;

      // If callback doesn't exists add it to the arguments (Prevent code to fail)
      if (typeof callback !== 'function' || callback === undefined) {
        calledArgs = Array.prototype.slice.call(calledArgs);
        calledArgs.push(callback = function () {});
      }

      // If it is GET or DELETE the path variables needs to come from arguments
      if (options.method === 'GET' || options.method === 'DELETE') {
        haveConfig = (typeof calledArgs[calledArgs.length - 2] === 'object');
        totalFunctionParams = (haveConfig) ? (pathParameters.length + 2) : (pathParameters.length + 1);

        // Set the configurations
        if (haveConfig) config = calledArgs[calledArgs.length - 2];

        // Verify arguments quantity
        if (totalFunctionParams > calledArgs.length) {
          error = new Error('Expecting parameters: ' + pathParameters.join(', ').replace(/\:/g, '') + '');
          reject(error);
          return callback.apply(null, [error, null]);
        }

        // Replace the path parameters for the variables
        pathParameters.forEach(function (param, index) {
          options.path = options.path.replace(param, calledArgs[index]);
        });
      } else {
        haveConfig = (calledArgs.length > 2);

        // If configurations are sent, set configurations and payload depending on the correspondent argument index
        if (haveConfig) {
          if (typeof calledArgs[calledArgs.length - 2] === 'object') config = calledArgs[calledArgs.length - 2];
          if (typeof calledArgs[calledArgs.length - 3] === 'object') payload = calledArgs[calledArgs.length - 3];
        } else {
          if (typeof calledArgs[calledArgs.length - 2] === 'object') payload = calledArgs[calledArgs.length - 2];
        }

        // Replace the path parameters from the ones on the payload
        pathParameters.forEach(function (param) {
          var propertyFromPayload = param.replace(':', '');

          if (payload && payload[propertyFromPayload]) {
            options.path = options.path.replace(param, payload[propertyFromPayload]);
          } else {
            missingPayloadProperties.push(propertyFromPayload);
          }
        });

        if (missingPayloadProperties.length > 0) {
          error = new Error('The JSON is missing the following properties: ' + missingPayloadProperties.join(', '));
          reject(error);
          return callback.apply(null, [error, null]);
        }
      }

      // If the path requires /sandbox prefix on sandbox mode, prepend it
      if (options.path_sandbox_prefix !== undefined && options.path_sandbox_prefix && configurations.sandbox) {
        options.path = '/sandbox' + options.path;
      }

      mainContext.generateAccessToken().then(function () {
        return mainContext.exec({
          schema: schema,
          path: options.path,
          method: options.method,
          config: config,
          payload: payload,
          idempotency: needIdempotency
        });
      }).then(function (response) {
        resolve(response);
        return callback.apply(null, [null, response]);
      }).catch(function (err) {
        reject(err);
        return callback.apply(null, [err, null]);
      });
    });
  };
};

/**
 * Get AccessToken. If it is already set do not make the request
 * @returns {string}
 */
requestManager.generateAccessToken = function (callback) {
  var me = this;
  var error;

  return new Promise(function (resolve, reject) {
    if (configurations.getAccessToken()) {
      resolve(configurations.getAccessToken());
      return callback.apply(null, [null, configurations.getAccessToken()]);
    } else {
      if (!configurations.getClientId() || !configurations.getClientSecret()) {
        error = new MercadoPagoError('Must set client_id and client_secret', 500, '');
        reject(error);
        return callback.apply(null, [error, null]);
      }

      me.exec({
        path: '/oauth/token',
        method: 'POST',
        payload: {
          client_id: configurations.getClientId(),
          client_secret: configurations.getClientSecret(),
          grant_type: 'client_credentials'
        }
      }, function (err, response) {
        if (err) {
          reject(err);
          return callback.apply(null, [err, null]);
        } else {
          configurations.setAccessToken(response.body.access_token)
            .setRefreshToken(response.body.refresh_token);

          resolve(response.body.access_token);
          return callback.apply(null, [null, response.body.access_token]);
        }
      });
    }
  });
};

/**
 * Set the new access_token using the previous one & the refresh_token
 * @param callback
 * @returns {*}
 */
requestManager.refreshAccessToken = function (callback) {
  var me = this;
  var error;

  return new Promise(function (resolve, reject) {
    if (!configurations.getRefreshToken()) {
      error = new MercadoPagoError('You need the refresh_token to refresh the access_token', 500, '');
      reject(error);
      return callback.apply(null, [error, null]);
    } else {
      me.exec({
        path: '/oauth/token',
        method: 'POST',
        payload: {
          client_secret: configurations.getAccessToken(),
          grant_type: 'refresh_token'
        }
      }, function (err, response) {
        if (err) {
          reject(err);
          return callback.apply(null, [err, null]);
        } else {
          configurations.setAccessToken(response.body.access_token)
            .setRefreshToken(response.body.refresh_token);

          resolve(response.body.access_token);
          return callback.apply(null, [null, response.body.access_token]);
        }
      });
    }
  });
};

/**
 * Build the request using the options send and the configurations
 * @param options
 * @returns {object}
 */
requestManager.buildRequest = function (options) {
  var me = this,
    request = {};

  request.uri = configurations.getBaseUrl() + options.path;
  request.method = options.method;
  request.headers = {
    'user-agent': configurations.getUserAgent(),
    accept: (options.headers && options.headers.accept) ? options.headers.accept : me.JSON_MIME_TYPE,
    'content-type': (options.headers && options.headers['content-type']) ? options.headers['content-type'] : me.JSON_MIME_TYPE
  };
  request.qs = options.config.qs || {}; // Always set the querystring object
  request.json = true; // Autoparse the response to JSON

  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
    // Set idempotency header if the resource needs idempotency of the config specified one
    if (options.idempotency || (options.config && options.config.idempotency)) {
      request.headers['x-idempotency-key'] = options.config.idempotency || uuid.v4();
    }

    if (request.headers['content-type'] === me.JSON_MIME_TYPE) {
      // If there is a schema available, validate the payload before continue
      if (options.schema) {
        var errors = validation.validate(options.schema, options.payload);

        if (errors.length > 0) {
          throw new Error(validation.generateErrorMessage(errors));
        }
      }

      request.json = options.payload;
    } else {
      request.form = options.payload;
    }
  }

  // Always add the access_token to the querystring
  request.qs.access_token = configurations.getAccessToken();
  request.strictSSL = true;

  return request;
};

/**
 * Executes the request build with the options sent
 * @param options
 * @param callback
 */
requestManager.exec = function (options, callback) {
  var me = this;

  if (typeof callback !== 'function' || callback === undefined) callback = function () {};

  return new Promise(function (resolve, reject) {
    var req;

    try {
      req = me.buildRequest(options)
    } catch (e) {
      reject(e);
      return callback.apply(null, [e, null]);
    }

    request(req, function (error, response, body) {
      if (error) {
        reject(error);
        return callback.apply(null, [error, null]);
      } else {
        if (response.statusCode < 200 || response.statusCode >= 300) {
          var mpError = new MercadoPagoError(body.message, response.statusCode, req.headers['x-idempotency-key']);
          reject(mpError);
          return callback.apply(null, [mpError, null]);
        } else {
          var mpResponse = new MercadopagoResponse(body, response.statusCode, req.headers['x-idempotency-key']);
          resolve(mpResponse);
          return callback.apply(null, [null, mpResponse]);
        }
      }
    });
  });
};
