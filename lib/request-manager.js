var request = require('request'),
    Promise = require('bluebird'),
    uuid = require('uuid'),
    configurations = require('./configurations'),
    mercadopagoResponse = require('./utils/mercadopagoResponse'),
    mercadopagoError = require('./utils/mercadopagoError'),
    validation = require('./validation');

var requestManager = module.exports = {
    JSON_MIME_TYPE: 'application/json',
    FORM_MIME_TYPE: 'application/x-www-form-urlencoded'
};

/**
 * Creates a dynamic function depending on the options that are send by the resources
 * @param options
 * @returns {Function}
 */
requestManager.describe = function(options){
    var _this = this;

    //This method will have the context of the class that is calling this (Will have the context of the class)
    return function(){
        var me = this,
            _arguments = arguments;

        return new Promise(function(resolve, reject){
            var callback = _arguments[_arguments.length - 1], //Last argument will always be the callback
                config = {},
                payload = {},
                error;

            //If callback doesnt exists add it to the arguments (Prevent code to fail)
            if( typeof callback !== 'function' || callback === undefined ){
                _arguments = Array.prototype.slice.call(_arguments);
                _arguments.push(callback = function(){});
            }

            //Get the path parameters from path
            var pathParameters = options.path.match(/(\:[a-z|A-Z|\_|\-]*)/g) || [];

            //If it is GET or DELETE the path variables needs to come from arguments
            if( options.method == 'GET' || options.method == 'DELETE' ){
                var haveConfig = (typeof _arguments[_arguments.length - 2] == 'object'),
                    totalParams = (haveConfig) ? (pathParameters.length + 2) : (pathParameters.length + 1);

                //Set the configurations
                if(haveConfig) config = _arguments[_arguments.length - 2];

                //Verify arguments quantity
                if( totalParams > _arguments.length ){
                    error = new Error('Expecting parameters: ' + pathParameters.join(', ').replace(/\:/g, '') + '');
                    reject(error);
                    return callback.apply(null, [error, null]);
                }

                //Replace the path parameters for the variables
                pathParameters.forEach(function(param, index){
                    options.path = options.path.replace(param, _arguments[index]);
                });
            }else{
                //If configurations are sent, set configurations and payload depending on the correspondent argument index
                if( _arguments.length > 2 ){
                    if(typeof _arguments[_arguments.length - 2] == 'object') config = _arguments[_arguments.length - 2];
                    if(typeof _arguments[_arguments.length - 3] == 'object') payload = _arguments[_arguments.length - 3];
                }else{
                    if(typeof _arguments[_arguments.length - 2] == 'object') payload = _arguments[_arguments.length - 2];
                }

                //If it is a POST, PUT, the path variables must come from JSON
                var missingProperties = [];

                //Replace the path parameters from the ones on the payload
                pathParameters.forEach(function(param){
                    var propertyFromPayload = param.replace(':', '');

                    if( payload && payload[propertyFromPayload] ){
                        options.path = options.path.replace(param, payload[propertyFromPayload]);
                    }else{
                        missingProperties.push(propertyFromPayload);
                    }
                });

                if( missingProperties.length > 0 ){
                    error = new Error('The JSON is missing the following properties: ' + missingProperties.join(', '));
                    reject(error);
                    return callback.apply(null, [error, null]);
                }
            }

            //The payload is always going to be the before last one
            var schema = me.schema,
                needIdempotency = !!me.idempotency;

            //If the path requires /sandbox prefix on sandbox mode, prepend it
            if( options.path_sandbox_prefix !== undefined && options.path_sandbox_prefix && configurations.sandbox ){
                options.path = '/sandbox' + options.path;
            }

            _this.generateAccessToken().then(function(){
                return _this.exec({
                    schema: schema,
                    path: options.path,
                    method: options.method,
                    config: config,
                    payload: payload,
                    idempotency: needIdempotency
                });
            }).then(function(response){
                resolve(response);
                return callback.apply(null, [null, response]);
            }).catch(function(err){
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
requestManager.generateAccessToken = function(callback){
    var me = this;

    return new Promise(function(resolve, reject){
        if( configurations.getAccessToken() ){
            resolve(configurations.getAccessToken());
            return callback.apply(null, [null, configurations.getAccessToken()]);
        }else{
            if( !configurations.getClientId() || !configurations.getClientSecret() ){
                var error = new Error('Must set client_id and client_secret');
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
            }, function(err, response){
                if(err){
                    var mpError = new Error('Error getting the access_token: ' + err.message);
                    reject(mpError);
                    return callback.apply(null, [mpError, null]);
                }else{
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
requestManager.refreshAccessToken = function(callback){
    var me = this;

    return new Promise(function(resolve, reject){
        if( !configurations.getRefreshToken() ){
            var error = new Error('You need the refresh_token to refresh the access_token');
            reject(error);
            return callback.apply(null, [error, null]);
        }else{
            me.exec({
                path: '/oauth/token',
                method: 'POST',
                payload: {
                    client_secret: configurations.getAccessToken(),
                    grant_type: 'refresh_token'
                }
            }, function(err, response){
                if(err){
                    var mpError = new Error('Error refreshing previous access_token: ' + err.message);
                    reject(mpError);
                    return callback.apply(null, [mpError, null]);
                }else{
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
requestManager.buildRequest = function(options){
    var me = this,
        request = {};

    request.uri = configurations.getBaseUrl() + options.path;
    request.method = options.method;
    request.headers = {
        'user-agent': configurations.getUserAgent(),
        'accept': (options.headers && options.headers['accept']) ? options.headers['accept'] : me.JSON_MIME_TYPE,
        'content-type': (options.headers && options.headers['content-type']) ? options.headers['content-type'] : me.JSON_MIME_TYPE
    };
    request.qs = options.config.qs || {}; //Always set the querystring object
    request.json = true; //Autoparse the response to JSON

    if( request.method == 'POST' || request.method == 'PUT' || request.method == 'PATCH' ){
        //Set idempotency header if the resource needs idempotency of the config specified one
        if( options.idempotency || (options.config && options.config.idempotency) ){
            request.headers['x-idempotency-key'] = options.config.idempotency || uuid.v4();
        }

        if( request.headers["content-type"] == me.JSON_MIME_TYPE ){
            //If there is a schema available, validate the payload before continue
            if(options.schema){
                var errors = validation.validate(options.schema, options.payload);

                if(errors.length > 0){
                    throw new Error(validation.generateErrorMessage(errors));
                }
            }

            request.json = options.payload;
        }else{
            request.form = options.payload;
        }
    }

    //Always add the access_token to the querystring
    request.qs.access_token = configurations.getAccessToken();
    request.strictSSL = true;

    return request;
};

/**
 * Executes the request build with the options sent
 * @param options
 * @param callback
 */
requestManager.exec = function(options, callback){
    var me = this;

    if(typeof callback !== 'function' || callback === undefined) callback = function(){};

    return new Promise(function(resolve, reject){
        var req;

        try{
            req = me.buildRequest(options)
        }catch(e){
            reject(e);
            return callback.apply(null, [e, null]);
        }

        request(req, function(error, response, body){
            if( error ) {
                reject(error);
                return callback.apply(null, [error, null]);
            }else{
                if( response.statusCode < 200 || response.statusCode >= 300 ){
                    var mpError = new mercadopagoError(body.message, response.statusCode, req.headers['x-idempotency-key']);
                    reject(mpError);
                    return callback.apply(null, [mpError, null]);
                }else{
                    var mpResponse = new mercadopagoResponse(body, response.statusCode, req.headers['x-idempotency-key']);
                    resolve(mpResponse);
                    return callback.apply(null, [null, mpResponse]);
                }
            }
        });
    });
};