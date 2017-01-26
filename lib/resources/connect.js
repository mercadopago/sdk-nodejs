var requestManager = require('../request-manager');
var configurations = require('../configurations');
var Promise = require('bluebird');
var preConditions = require('../precondition');

var connect = module.exports = {};

connect.get = requestManager.describe({
  base_url: 'https://auth.mercadopago.com.ar',
  path: '/authorization',
  method: 'GET'
});

// Get the access_token for mercadopago connect client
connect.getCredentials = requestManager.getUserCredentials;

/**
 * Send the authorizationCode to the redirectURI specified
 * @param clientId
 * @param redirectURI
 * @param callback
 */
connect.sendAuthorizationCode = function (clientId, redirectURI, callback) {
  return this.get({
    qs: {
      client_id: clientId,
      response_type: 'code',
      platform_id: 'mp',
      redirect_uri: redirectURI
    }
  }, callback);
};

/**
 * Get the access_token from MercadoPago API and set the access_token to the SDK
 * @param clientId
 * @param redirectURI
 * @param callback
 * @returns {*}
 */
connect.getCredentialsAndConfigure = function (clientSecret, authorizationCode, redirectURI, callback) {
  callback = preConditions.getCallback(callback);

  return requestManager.getUserCredentials(clientSecret, authorizationCode, redirectURI).then(function (response) {
    configurations.setAccessToken(response.body.access_token)
      .setRefreshToken(response.body.refresh_token);

    callback.apply(null, [null, response]);
    return Promise.resolve(response);
  }).catch(function (error) {
    callback.apply(null, [error, null]);
    return Promise.reject(error);
  });
};
