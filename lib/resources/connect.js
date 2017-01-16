var requestManager = require('../request-manager');

var connect = module.exports = {};

connect.get = requestManager.describe({
    base_url: 'https://auth.mercadopago.com.ar',
    path: '/authorization',
    method: 'GET'
});

//Get the access_token for mercadopago connect client
connect.getCredentials = requestManager.getUserCredentials;

/**
 * Send the authorizationCode to the redirectURI specified
 * @param clientId
 * @param redirectURI
 * @param callback
 */
connect.sendAuthorizationCode = function(clientId, redirectURI, callback){
    return this.get({
        qs: {
            client_id: clientId,
            response_type: 'code',
            platform_id: 'mp',
            redirect_uri: redirectURI
        }
    }, callback);
};