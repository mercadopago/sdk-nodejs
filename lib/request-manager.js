var request = require('request'),
    uuid = require('uuid'),
    configurations = require('./configurations'),
    cacheManager = require('./cache-manager'),
    validation = require('./validation'),
    mercadopagoResponse = require('./utils/mercadopagoResponse'),
    mercadopagoError = require('./utils/mercadopagoError');

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
    var me = this;

    //This method will have the context of the class that is calling this (Will have the context of the class)
    return function(){
        var _arguments = arguments,
            callback = _arguments[_arguments.length - 1], //Last argument will always be the callback
            config = {},
            payload = {};

        //Check that the callback exists
        if( typeof callback !== 'function' || callback === undefined ){
            throw new Error('Callback is required');
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
                throw new Error('Expecting parameters: ' + pathParameters.join(', ').replace(/\:/g, '') + '');
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
            pathParameters.forEach(function(param, index){
                var propertyFromPayload = param.replace(':', '');

                if( payload && payload[propertyFromPayload] ){
                    options.path = options.path.replace(param, payload[propertyFromPayload]);
                }else{
                    missingProperties.push(propertyFromPayload);
                }
            });

            if( missingProperties.length > 0 ){
                throw new Error('The JSON is missing the following properties: ' + missingProperties.join(', '));
            }
        }

        //If cache is active check before execute REST operation (Only GET Operations)
        if( options.method == 'GET' && config.cache ){
            var cachedResponse,
                hash = cacheManager.generateCacheKey(options.path, options.headers, payload, config.qs);

            //If it is on cache return the value
            if(cachedResponse = cacheManager.get(hash)) return callback.apply(null, [null, cachedResponse]);
        }

        //The payload is always going to be the before last one
        var schema = this.schema,
            needIdempotency = this.idempotency ? true : false;

        //Generate the accessToken
        me.generateAccessToken(function(err){
            if(err){
                return callback.apply(null, [err, null]);
            }

            //Execute the rest operation
            return me.exec({
                schema: schema,
                path: options.path,
                method: options.method,
                config: config,
                payload: payload,
                idempotency: needIdempotency,
                cache: options.cache,
                headers: options.headers || {}
            }, callback);
        });
    };
};

/**
 * Get AccessToken. If it is already set do not make the request
 * @returns {string}
 */
requestManager.generateAccessToken = function(callback){
    if( configurations.getAccessToken() ){
        return callback.apply(null, [null, configurations.getAccessToken()]);
    }else{
        if( !configurations.getClientId() || !configurations.getClientSecret() ){
            return callback.apply(null, [new Error('Must set client_id and client_secret'), null]);
        }

        this.exec({
            path: '/oauth/token',
            method: 'POST',
            payload: {
                client_id: configurations.getClientId(),
                client_secret: configurations.getClientSecret(),
                grant_type: 'client_credentials'
            }
        }, function(err, response){
            if(err){
                return callback.apply(null, [new Error('Error getting the access_token: ' + err.message), null]);
            }else{
                configurations.setAccessToken(response.body.access_token)
                    .setRefreshToken(response.body.refresh_token);

                return callback.apply(null, [null, response.body.access_token]);
            }
        });
    }
};

/**
 * Set the new access_token using the previous one & the refresh_token
 * @param callback
 * @returns {*}
 */
requestManager.refreshAccessToken = function(callback){
    if( !configurations.getRefreshToken() ){
        return callback.apply(null, [new Error('You need the refresh_token to refresh the access_token'), null]);
    }else{
        this.exec({
            path: '/oauth/token',
            method: 'POST',
            payload: {
                client_secret: configurations.getAccessToken(),
                grant_type: 'refresh_token'
            }
        }, function(err, response){
            if(err){
                return callback.apply(null, [new Error('Error refreshing previous access_token: ' + err.message), null]);
            }else{
                configurations.setAccessToken(response.body.access_token)
                    .setRefreshToken(response.body.refresh_token);

                return callback.apply(null, [null, response.body.access_token]);
            }
        });
    }
};

/**
 * Build the request using the options send and the configurations
 * @param options
 * @returns {object}
 */
requestManager.buildRequest = function(options){
    var request = {};

    request.uri = configurations.getBaseUrl() + options.path;
    request.method = options.method;
    request.headers = {
        'user-agent': configurations.getUserAgent(),
        'accept': (options.headers && options.headers['accept']) ? options.headers['accept'] : this.JSON_MIME_TYPE,
        'content-type': (options.headers && options.headers['content-type']) ? options.headers['content-type'] : this.JSON_MIME_TYPE
    };
    request.qs = {}; //Always set the querystring object
    request.json = true; //Autoparse the repsonse to JSON

    if( request.method == 'GET' ){
        request.qs = options.config.qs || {};
    }else{
        //Set idempotency header if the resource needs idempotency of the config specified one
        if( options.idempotency || options.config.idempotency ){
            request.headers['x-idempotency-key'] = options.config.idempotency || uuid.v4();
        }

        if( request.headers["content-type"] == this.JSON_MIME_TYPE ){
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
 * Executes the request build with the options sended
 * @param options
 * @param callback
 */
requestManager.exec = function(options, callback){
    var me = this,
        req;

    try{
        req = this.buildRequest(options)
    }catch(e){
        return callback.apply(null, [e, null]);
    }

    request(req, function(error, response, body){
        if( error ) {
            return callback.apply(null, [error, null]);
        }else{
            if( response.statusCode < 200 || response.statusCode >= 300 ){
                var mpError = new mercadopagoError(body.message, response.statusCode, req.headers['x-idempotency-key']);
                return callback.apply(null, [mpError, null]);
            }else{
                var mpResponse = new mercadopagoResponse(body, response.statusCode, req.headers['x-idempotency-key']);

                if( options.method == 'GET' && options.cache ){
                    cacheManager.save(cacheManager.generateCacheKey(options.path, options.headers, options.payload, ((options.config) ? options.config.qs : {})), mpResponse);
                }

                return callback.apply(null, [null, mpResponse]);
            }
        }
    });
};