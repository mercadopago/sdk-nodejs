var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    sinon = require('sinon');

describe('Request Manager', function(){
    var requestLib = require('request'),
        requestManager = require('../lib/request-manager'),
        configurationModule = require('../lib/configurations'),
        cacheManager = require('../lib/cache-manager'),
        mercadopagoResponse = require('../lib/utils/mercadopagoResponse');
        mercadopagoError = require('../lib/utils/mercadopagoError');

    describe('Dynamic method Creation', function(){
        it('Callback Required', function(){
            var method = requestManager.describe({
                path: '/v1/payments',
                method: 'POST'
            });

            assert.throws(method, 'Callback is required');
        });

        it('Missing id parameter from arguments (GET)', function(){
            var method = requestManager.describe({
                path: '/v1/payments/:id',
                method: 'GET'
            });

            assert.throws(method.bind(method, function(){}), 'Expecting parameters: id');
        });

        it('Missing id parameter from JSON (POST)', function(){
            var method = requestManager.describe({
                path: '/v1/payments/:id',
                method: 'POST'
            });

            assert.throws(method.bind(method, function(){}), 'The JSON is missing the following properties: id');
        });

        it('Missing multiple parameters from JSON (POST)', function(){
            var method = requestManager.describe({
                path: '/v1/payments/:id/:name',
                method: 'POST'
            });

            assert.throws(method.bind(method, function(){}), 'The JSON is missing the following properties: id, name');
        });

        it('Error generating the access_token', function(){
            var tokenErrorMessage = 'Error getting the token';

            var method = requestManager.describe({
                path: '/v1/payments',
                method: 'POST'
            });

            sinon.stub(requestManager, 'generateAccessToken', function(callback){
                return callback.apply(null, [new Error(tokenErrorMessage), null]);
            });

            method(function(err, response){
                assert.isNotNull(err, null);
                assert.equal(err.message, tokenErrorMessage);
            });

            requestManager.generateAccessToken.restore();
        });

        describe('Valid rest executions', function(){
            var mercadoPagoResponse = {
                    status: 200,
                    body: {
                        firstname: 'Ariel'
                    }
                },
                execStub;

            beforeEach(function(){
                sinon.stub(requestManager, 'generateAccessToken', function(callback){
                    return callback.apply(null, [null, 'ACCESS_TOKEN']);
                });

                execStub = sinon.stub(requestManager, 'exec', function(options, callback){
                    return callback.apply(null, [null, mercadoPagoResponse]);
                });
            });

            afterEach(function(){
                requestManager.generateAccessToken.restore();
                requestManager.exec.restore();
            });

            it('Without path parameters (GET)', function(){
                var callback = sinon.spy();

                var method = requestManager.describe({
                    path: '/v1/payments',
                    method: 'GET'
                });

                method(callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments');
                assert.equal(execOptionParams.method, 'GET');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
            });

            it('With path parameters on arguments (GET)', function(){
                var callback = sinon.spy();

                var method = requestManager.describe({
                    path: '/v1/payments/:id',
                    method: 'GET'
                });

                method(1, callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments/1');
                assert.equal(execOptionParams.method, 'GET');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
            });

            it('With path_sandbox_prefix (GET)', function(){
                var callback = sinon.spy();

                //Set sandbox mode for path_sandbox_prefix
                configurationModule.sandbox = true;

                var method = requestManager.describe({
                    path: '/v1/payments',
                    method: 'GET',
                    path_sandbox_prefix: true
                });

                var getSpy = sinon.spy(cacheManager, 'get'),
                    generateHashSpy = sinon.spy(cacheManager, 'generateCacheKey');

                method(1, {
                    cache: true
                }, callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                assert.isTrue(getSpy.called);
                assert.isTrue(generateHashSpy.called);

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/sandbox/v1/payments');
                assert.equal(execOptionParams.method, 'GET');
                assert.isTrue(execOptionParams.config.cache);
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));

                cacheManager.get.restore();
                cacheManager.generateCacheKey.restore();
            });

            it('With path parameters on JSON (POST)', function(){
                var callback = sinon.spy(),
                    payload = {
                        id: 1
                    };

                var method = requestManager.describe({
                    path: '/v1/payments/:id',
                    method: 'POST'
                });

                method(payload, callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments/1');
                assert.equal(execOptionParams.method, 'POST');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(payload));
            });

            it('With path parameters on JSON with configurations (POST)', function(){
                var callback = sinon.spy(),
                    payload = {
                        id: 1
                    };

                var method = requestManager.describe({
                    path: '/v1/payments/:id',
                    method: 'POST'
                });

                method(payload, {
                    cache: true
                }, callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments/1');
                assert.equal(execOptionParams.method, 'POST');
                assert.isTrue(execOptionParams.config.cache);
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(payload));
            });

            it('Without path parameters on JSON and invalid configurations (POST)', function(){
                var callback = sinon.spy();

                var method = requestManager.describe({
                    path: '/v1/payments',
                    method: 'POST'
                });

                method('', '', callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments');
                assert.equal(execOptionParams.method, 'POST');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
                assert.equal(JSON.stringify(execOptionParams.config), JSON.stringify({}));
            });

            it('With payload (POST)', function(){
                var callback = sinon.spy(),
                    testPayload = {
                        description: 'MercadoPago Sale'
                    };

                this.schema = {};
                this.idempotency = true;

                var method = requestManager.describe({
                    path: '/v1/payments',
                    method: 'POST'
                });

                method(testPayload, callback);
                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments');
                assert.equal(execOptionParams.method, 'POST');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(testPayload));
                assert.isFalse(execOptionParams.idempotency);
            });

            it('With idempotency on resource (POST)', function(){
                var callback = sinon.spy(),
                    testPayload = {
                        description: 'MercadoPago Sale'
                    };

                var resource = {
                    idempotency: true,
                    method: requestManager.describe({
                        path: '/v1/payments',
                        method: 'POST'
                    })
                };

                resource.method(testPayload, callback);
                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments');
                assert.equal(execOptionParams.method, 'POST');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(testPayload));
                assert.isTrue(execOptionParams.idempotency);
            });

            it('Response from cache (GET)', function(){
                var callback = sinon.spy();

                var method = requestManager.describe({
                    path: '/v1/payments',
                    method: 'GET'
                });

                var getStub = sinon.stub(cacheManager, 'get').returns(mercadoPagoResponse),
                    generateHashSpy = sinon.spy(cacheManager, 'generateCacheKey');

                method({
                    cache: true
                }, callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                assert.isTrue(getStub.called);
                assert.isTrue(generateHashSpy.called);

                assert.isFalse(execStub.called);

                cacheManager.get.restore();
                cacheManager.generateCacheKey.restore();
            });
        });
    });

    describe('Generate Token', function(){
        var mpTokenResponse = {
                status: 200,
                body: {
                    access_token: 'ACCESS_TOKEN',
                    refresh_token: 'REFRESH_TOKEN'
                }
            },
            execStub;

        beforeEach(function(){
            execStub = sinon.stub(requestManager, 'exec', function(options, callback){
                return callback.apply(null, [null, mpTokenResponse]);
            });
        });

        afterEach(function(){
            requestManager.exec.restore();
            //Empty the accessToken
            configurationModule.setAccessToken('');
        });

        it('Already have access_token', function(){
            var callback = sinon.spy(),
                accessToken = 'STUB_ACCESS_TOKEN';

            sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);

            requestManager.generateAccessToken(callback);

            assert.isTrue(callback.called);
            assert.isTrue(callback.calledWith(null, accessToken));

            configurationModule.getAccessToken.restore();
        });

        it('Missing client_id and client_secret Error', function(){
            var callback = sinon.spy();
 
            sinon.stub(configurationModule, 'getClientId').returns();
            sinon.stub(configurationModule, 'getClientSecret').returns();
 
            requestManager.generateAccessToken(callback);

            var getTokenError = callback.args[0][0];

            assert.equal(getTokenError.message, 'Must set client_id and client_secret');
 
            configurationModule.getClientId.restore();
            configurationModule.getClientSecret.restore(); 
        });

        it('Get the access_token from MercadoPago API', function(){
            var callback = sinon.spy(),
                clientId = 'CLIENT_ID',
                clientSecret = 'CLIENT_SECRET';

            sinon.stub(configurationModule, 'getClientId').returns(clientId);
            sinon.stub(configurationModule, 'getClientSecret').returns(clientSecret);

            requestManager.generateAccessToken(callback);

            var execOptionParams = execStub.args[0][0];

            assert.equal(execOptionParams.path, '/oauth/token');
            assert.equal(execOptionParams.method, 'POST');
            assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            }));

            assert.isTrue(callback.called);
            assert.isTrue(callback.calledWith(null, mpTokenResponse.body.access_token));

            configurationModule.getClientId.restore();
            configurationModule.getClientSecret.restore();
        });

        it('Failing getting the access_token from MercadoPago API', function(){
            var errorMessage = 'Error getting token';

            //Restore the exec on beforeEach
            requestManager.exec.restore();

            //Create another stub that fails
            execStub = sinon.stub(requestManager, 'exec', function(options, callback){
                return callback.apply(null, [new Error(errorMessage), null]);
            });

            var callback = sinon.spy(),
                clientId = 'CLIENT_ID',
                clientSecret = 'CLIENT_SECRET';

            sinon.stub(configurationModule, 'getClientId').returns(clientId);
            sinon.stub(configurationModule, 'getClientSecret').returns(clientSecret);

            requestManager.generateAccessToken(callback);

            assert.isTrue(callback.called);

            var callbackError = callback.args[0][0];

            assert.equal(callbackError.message, 'Error getting the access_token: ' + errorMessage);

            configurationModule.getClientId.restore();
            configurationModule.getClientSecret.restore();
        });
    });

    describe('Refresh Token', function(){
        var mpTokenResponse = {
                status: 200,
                body: {
                    access_token: 'ACCESS_TOKEN',
                    refresh_token: 'REFRESH_TOKEN'
                }
            },
            execStub;

        beforeEach(function(){
            execStub = sinon.stub(requestManager, 'exec', function(options, callback){
                return callback.apply(null, [null, mpTokenResponse]);
            });
        });

        afterEach(function(){
            requestManager.exec.restore();
            //Empty the accessToken
            configurationModule.setAccessToken('');
        });

        it('Missing refres_token property', function(){
            var callback = sinon.spy();

            sinon.stub(configurationModule, 'getRefreshToken').returns('');

            requestManager.refreshAccessToken(callback);

            assert.isTrue(callback.called);

            var callbackError = callback.args[0][0];

            assert.equal(callbackError.message, 'You need the refresh_token to refresh the access_token');

            configurationModule.getRefreshToken.restore();
        });

        it('Get access_token from MercadoPago API', function(){
            var callback = sinon.spy(),
                accessToken = 'ACCESS_TOKEN',
                refreshToken = 'REFRESH_TOKEN';

            sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);
            sinon.stub(configurationModule, 'getRefreshToken').returns(refreshToken);

            requestManager.refreshAccessToken(callback);

            var execOptionParams = execStub.args[0][0];

            assert.equal(execOptionParams.path, '/oauth/token');
            assert.equal(execOptionParams.method, 'POST');
            assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({
                client_secret: accessToken,
                grant_type: 'refresh_token'
            }));

            assert.isTrue(callback.called);
            assert.isTrue(callback.calledWith(null, mpTokenResponse.body.access_token));

            configurationModule.getAccessToken.restore();
            configurationModule.getRefreshToken.restore();
        });

        it('Failing refreshing the access_token', function(){
            var errorMessage = 'Error refreshing token';

            //Restore the exec on beforeEach
            requestManager.exec.restore();

            //Create another stub that fails
            execStub = sinon.stub(requestManager, 'exec', function(options, callback){
                return callback.apply(null, [new Error(errorMessage), null]);
            });

            var callback = sinon.spy(),
                accessToken = 'ACCESS_TOKEN',
                refreshToken = 'REFRESH_TOKEN';

            sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);
            sinon.stub(configurationModule, 'getRefreshToken').returns(refreshToken);

            requestManager.refreshAccessToken(callback);

            var callbackError = callback.args[0][0];

            assert.equal(callbackError.message, 'Error refreshing previous access_token: ' + errorMessage);

            configurationModule.getAccessToken.restore();
            configurationModule.getRefreshToken.restore();
        });
    });

    describe('Build Request', function(){
        var baseUrl = 'http://api.mercadopago.com',
            accessToken = 'ACCESS_TOKEN',
            userAgent = 'USER_AGENT';

        beforeEach(function(){
            sinon.stub(configurationModule, 'getUserAgent').returns(userAgent);
            sinon.stub(configurationModule, 'getBaseUrl').returns(baseUrl);
            sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);
        });

        afterEach(function(){
            configurationModule.getUserAgent.restore();
            configurationModule.getBaseUrl.restore();
            configurationModule.getAccessToken.restore();
        });

        it('Valid GET Request with querystring', function(){
            var options = {
                path: '/v1/payments',
                method: 'GET',
                config: {
                    qs: {
                        firstname: 'Ariel'
                    }
                }
            };

            var request = requestManager.buildRequest(options);

            assert.equal(request.uri, baseUrl + options.path);
            assert.equal(request.method, options.method);
            assert.equal(JSON.stringify(request.qs), JSON.stringify(options.config.qs));
            assert.equal(request.headers['user-agent'], userAgent);
            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
            assert.isTrue(request.json);
            assert.isTrue(request.strictSSL);
        });

        it('Valid GET Request without querystring', function(){
            var options = {
                config: {},
                path: '/v1/payments',
                method: 'GET'
            };

            var request = requestManager.buildRequest(options);

            assert.equal(request.uri, baseUrl + options.path);
            assert.equal(request.method, options.method);
            assert.equal(JSON.stringify(request.qs), JSON.stringify({ access_token: accessToken }));
            assert.equal(request.headers['user-agent'], userAgent);
            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
            assert.isTrue(request.json);
            assert.isTrue(request.strictSSL);
        });

        it('Valid POST Request with specific idempotency', function(){
            var fakeIdempotency = 'fake-uuid',
                    options = {
                    path: '/v1/payments',
                    method: 'POST',
                    payload: {
                        firstname: 'Ariel'
                    },
                    config: {
                        idempotency: fakeIdempotency
                    }
                };

            var request = requestManager.buildRequest(options);

            assert.equal(request.uri, baseUrl + options.path);
            assert.equal(request.method, options.method);
            assert.equal(JSON.stringify(request.qs), JSON.stringify({ access_token: accessToken }));
            assert.equal(request.headers['user-agent'], userAgent);
            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['x-idempotency-key'], fakeIdempotency);
            assert.equal(request.json, options.payload);
            assert.isTrue(request.strictSSL);
        });

        it('Valid POST Request with specific without specific idempotency', function(){
            var fakeIdempotency = 'fake-uuid',
                options = {
                    path: '/v1/payments',
                    method: 'POST',
                    payload: {
                        firstname: 'Ariel'
                    },
                    config: {},
                    idempotency: true
                };

            var request = requestManager.buildRequest(options);

            assert.equal(request.uri, baseUrl + options.path);
            assert.equal(request.method, options.method);
            assert.equal(JSON.stringify(request.qs), JSON.stringify({ access_token: accessToken }));
            assert.equal(request.headers['user-agent'], userAgent);
            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
            assert.isString(request.headers['x-idempotency-key']);
            assert.equal(request.json, options.payload);
            assert.isTrue(request.strictSSL);
        });

        it('Validate with empty headers option', function(){
            var options = {
                path: '/v1/payments',
                method: 'POST',
                headers: {},
                payload: {
                    firstname: 'Ariel'
                },
                config: {}
            };

            var request = requestManager.buildRequest(options);

            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
            assert.isUndefined(request.headers['x-idempotency-key']);
        });

        it('Validate POST Request with form different Mime Type (accept, content-type)', function(){
            var options = {
                path: '/v1/payments',
                method: 'POST',
                payload: {
                    firstname: 'Ariel'
                },
                headers: {
                    'accept': requestManager.FORM_MIME_TYPE,
                    'content-type': requestManager.FORM_MIME_TYPE
                },
                config: {}
            };

            var request = requestManager.buildRequest(options);

            assert.equal(request.uri, baseUrl + options.path);
            assert.equal(request.method, options.method);
            assert.equal(JSON.stringify(request.qs), JSON.stringify({ access_token: accessToken }));
            assert.equal(request.headers['user-agent'], userAgent);
            assert.equal(request.headers.accept, requestManager.FORM_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.FORM_MIME_TYPE);
            assert.equal(request.form, options.payload);
            assert.isTrue(request.json);
            assert.isTrue(request.strictSSL);
        });

        it('Validate POST Request with schema validation', function(){
            var options = {
                path: '/v1/payments',
                method: 'POST',
                payload: {
                    firstname: 'Ariel'

                },
                schema: {
                    "properties": {
                        "firstname": {
                            "type": "string"
                        }
                    }
                },
                config: {}
            };

            var request = requestManager.buildRequest(options);

            assert.isObject(request);
        });

        it('Validate POST Request with errors on schema validation', function(){
            var options = {
                path: '/v1/payments',
                method: 'POST',
                payload: {
                    firstname: 'Ariel'
                },
                schema: {
                    "properties": {
                        "firstname": {
                            "type": "integer"
                        }
                    }
                },
                config: {}
            };

            assert.throws(requestManager.buildRequest.bind(requestManager, options), 'The next fields are failing on validation: ".firstname": should be integer.');
        });
    });

    describe('Execute method', function(){
        var fakeIdempotency = 'fake-uuid',
            buildRequestValidResponse = {
                headers: {
                    'x-idempotency-key': fakeIdempotency
                }
            };

        it('Error on buildRequest', function(){
            var callback = sinon.spy(),
                errorMessage = 'Fail on request';

            sinon.stub(requestManager, 'buildRequest').throws(new Error(errorMessage));

            requestManager.exec({}, callback);

            var callbackErrors = callback.args[0][0];

            assert.equal(callbackErrors.message, errorMessage);

            requestManager.buildRequest.restore();
        });

        it('Error executing the request', function(){
            var callback = sinon.spy(),
                errorMessage = 'Fail executing request';

            sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

            sinon.stub(requestLib, 'Request', function(params){
                return params.callback.apply(null, [new Error(errorMessage), null, null]);
            });

            requestManager.exec({}, callback);

            var callbackErrors = callback.args[0][0];

            assert.equal(callbackErrors.message, errorMessage);

            requestManager.buildRequest.restore();
            requestLib.Request.restore();
        });

        it('Invalid HTTP Status Code on response from MercadoPago API', function(){
            var callback = sinon.spy(),
                errorMessage = 'Error on MercadoPago API';

            sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

            sinon.stub(requestLib, 'Request', function(params){
                return params.callback.apply(null, [null, {
                    statusCode: 500
                }, {
                    message: errorMessage
                }]);
            });

            requestManager.exec({}, callback);

            var callbackErrors = callback.args[0][0];

            assert.instanceOf(callbackErrors, mercadopagoError);
            assert.equal(callbackErrors.message, errorMessage);
            assert.equal(callbackErrors.idempotency, buildRequestValidResponse.headers['x-idempotency-key']);

            requestManager.buildRequest.restore();
            requestLib.Request.restore();
        });

        it('Valid response with correct HTTP Post', function(){
            var callback = sinon.spy();

            sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

            sinon.stub(requestLib, 'Request', function(params){
                return params.callback.apply(null, [null, {
                    statusCode: 500
                }, {}]);
            });

            requestManager.exec({}, callback);

            var callbackErrors = callback.args[0][0];

            assert.equal(callbackErrors.message, 'Unknown Error');

            requestManager.buildRequest.restore();
            requestLib.Request.restore();
        });

        it('Valid Response From MercadoPago API', function(){
            var callback = sinon.spy(),
                responseBody = {
                    firstname: 'Ariel'
                };

            sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

            sinon.stub(requestLib, 'Request', function(params){
                return params.callback.apply(null, [null, {
                    statusCode: 200
                }, responseBody]);
            });

            requestManager.exec({}, callback);

            var callbackResponse = callback.args[0][1];

            assert.instanceOf(callbackResponse, mercadopagoResponse);
            assert.equal(JSON.stringify(new mercadopagoResponse(responseBody, 200, fakeIdempotency)), JSON.stringify(callbackResponse));

            requestManager.buildRequest.restore();
            requestLib.Request.restore();
        });

        it('with cache configuration (GET)', function(){
            var callback = sinon.spy(),
                responseBody = {
                    firstname: 'Ariel'
                };
            sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

            sinon.stub(requestLib, 'Request', function(params){
                return params.callback.apply(null, [null, {
                    statusCode: 200
                }, responseBody]);
            });

            var saveStub = sinon.spy(cacheManager, 'save'),
                generateHashSpy = sinon.stub(cacheManager, 'generateCacheKey').returns('test-hash');

            requestManager.exec({
                path: '/test-path',
                method: 'GET',
                headers: {},
                cache: true
            }, callback);

            var callbackResponse = callback.args[0][1];

            assert.instanceOf(callbackResponse, mercadopagoResponse);
            assert.equal(JSON.stringify(new mercadopagoResponse(responseBody, 200, fakeIdempotency)), JSON.stringify(callbackResponse));

            var generateArguments = generateHashSpy.args[0],
                saveArguments = saveStub.args[0];

            assert.isTrue(generateHashSpy.called);
            assert.isTrue(saveStub.called);

            assert.equal(generateArguments[0], '/test-path');
            assert.equal(JSON.stringify(generateArguments[1]), JSON.stringify({}));
            assert.equal(JSON.stringify(generateArguments[2]), JSON.stringify({}));

            assert.equal(saveArguments[0], 'test-hash');
            assert.equal(JSON.stringify(saveArguments[1]), JSON.stringify(callbackResponse));

            //Testing sending querystring
            requestManager.exec({
                path: '/test-path',
                method: 'GET',
                cache: true,
                config: {
                    qs: {
                        filter: 'firstname'
                    }
                }
            }, callback);

            assert.isTrue(generateHashSpy.called);
            assert.isTrue(saveStub.called);

            requestManager.buildRequest.restore();
            requestLib.Request.restore();

            cacheManager.save.restore();
            cacheManager.generateCacheKey.restore();
        });
    });
});