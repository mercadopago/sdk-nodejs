var request = require('request'),
    configurations = require('./configurations'),
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
requestManager.create = function(options){
    var me = this;

    //This method will have the context of the class that is calling this (Will have the context of the class)
    return function(){
        var _arguments = arguments,
            callback = _arguments[_arguments.length - 1]; //Last argument will always be the callback

        //Check that the callback exists
        if( typeof callback !== 'function' || callback === undefined ){
            throw new Error('Callback is required');
        }

        //Get the path parameters
        var pathParameters = options.path.match(/(\:[a-z|A-Z|\_|\-]*)/g) || [];

        //Check that the number of arguments is correct (+1 for callback)
        if( (pathParameters.length + 1) > _arguments.length ){
            throw new Error('Expecting parameters: ' + pathParameters.join(', ').replace(/\:/g, '') + '');
        }

        //Replace the path parameters for the variables
        pathParameters.forEach(function(param, index){
            options.path = options.path.replace(param, _arguments[index]);
        });

        //The payload is always going to be the before last one
        var payload = typeof _arguments[_arguments.length - 2] == 'object' ? (_arguments[_arguments.length - 2] || {}) : {},
            schema = this.schema;

        //Generate the accessToken
        me.generateAccessToken(function(err){
            if(err){
                return callback.apply(null, [err, null]);
            }

            //Execute the rest operation
            return me.exec({
                path: options.path,
                method: options.method,
                payload: payload,
                schema: schema
            }, callback);
        });
    };
};

/**
 * Get AccessToken. If it is already set do not make the request
 * @returns {string}
 */
requestManager.generateAccessToken = function(callback){
    //TODO: Manage refreshing the access_token when expire
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
                configurations.setAccessToken(response.response.access_token);
                return callback.apply(null, [null, response.response.access_token]);
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
        'accept': options.headers ? (options.headers['accept'] || this.JSON_MIME_TYPE) : this.JSON_MIME_TYPE,
        'content-type': options.headers ? (options.headers['content-type'] || this.JSON_MIME_TYPE) : this.JSON_MIME_TYPE
    };
    request.qs = {}; //Always set the querystring object
    request.json = true; //Autoparse the repsonse to JSON

    if( request.method == 'GET' ){
        request.qs = options.payload;
    }else{
        if (request.headers["content-type"] == this.JSON_MIME_TYPE) {
            //If there is a schema available, validate the payload before continue
            if(options.schema){
                var errors = validation.validate(options.schema, options.payload);

                if(errors.length > 0){
                    throw new Error(validation.generateErrorMessage(errors));
                }
            }

            request.json = options.payload;
        } else {
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
                return callback.apply(null, [new Error(body.message ? body.message : 'Unknown Error'), null]);
            }else{
                return callback.apply(null, [null, {
                    "status": response.statusCode,
                    "response": body
                }]);
            }
        }
    });
};