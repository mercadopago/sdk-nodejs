var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    sinon = require('sinon');

describe('Request Manager', function(){
    var requestManager = require('../lib/request-manager'),
        configurationModule = require('../lib/configurations');

    describe('Dynamic method Creation', function(){
        it('Callback Required', function(){
            var method = requestManager.create({
                path: '/v1/payments',
                method: 'POST'
            });

            assert.throws(method, 'Callback is required');
        });

        it('Invalid Params', function(){
            var method = requestManager.create({
                path: '/v1/payments/:id',
                method: 'POST'
            });

            assert.throws(method.bind(method, function(){}), 'Expecting parameters: id');
        });

        it('Error on token', function(){
            var tokenErrorMessage = 'Error getting the token';

            var method = requestManager.create({
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
                    firstname: 'Ariel'
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

            it('Without params', function(){
                var callback = sinon.spy();

                var method = requestManager.create({
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

            it('With params', function(){
                var callback = sinon.spy();

                var method = requestManager.create({
                    path: '/v1/payments/:id',
                    method: 'POST'
                });

                method(1, callback);

                assert.isTrue(callback.called);
                assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

                //Validate exec params
                var execOptionParams = execStub.args[0][0];

                assert.equal(execOptionParams.path, '/v1/payments/1');
                assert.equal(execOptionParams.method, 'POST');
                assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
            });

            it('With payload', function(){
                var callback = sinon.spy(),
                    testPayload = {
                        description: 'MercadoPago Sale'
                    };

                var method = requestManager.create({
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
            });
        });
    });

    describe('Generate Token', function(){
        var mpTokenResponse = {
                access_token: 'ACCESS_TOKEN',
                refresh_token: 'REFRESH_TOKEN'
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

        it('Missing client_id and client_secret exception', function(){
            var callback = sinon.spy();

            requestManager.generateAccessToken(callback);

            var getTokenError = callback.args[0][0];

            assert.equal(getTokenError.message, 'Must set client_id and client_secret');
        });

        it('Get the access_token from MercadoPago', function(){
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
            assert.isTrue(callback.calledWith(null, mpTokenResponse.access_token));

            configurationModule.getClientId.restore();
            configurationModule.getClientSecret.restore();
        });

        it('Failing getting the access_token from MercadoPago', function(){
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
                access_token: 'ACCESS_TOKEN',
                refresh_token: 'REFRESH_TOKEN'
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

        it('Refresh token doesnt set', function(){
            var callback = sinon.spy();

            sinon.stub(configurationModule, 'getRefreshToken').returns('');

            requestManager.refreshAccessToken(callback);

            assert.isTrue(callback.called);

            var callbackError = callback.args[0][0];

            assert.equal(callbackError.message, 'You need the refresh_token to refresh the access_token');

            configurationModule.getRefreshToken.restore();
        });

        it('Get new access_token from MercadoPago', function(){
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
            assert.isTrue(callback.calledWith(null, mpTokenResponse.access_token));

            configurationModule.getAccessToken.restore();
            configurationModule.getRefreshToken.restore();
        });

        it('Failing refreshing the previous access_token', function(){
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

        it('Validate GET Request', function(){
            var options = {
                path: '/v1/payments',
                method: 'GET',
                payload: {
                    firstname: 'Ariel'
                }
            };

            var request = requestManager.buildRequest(options);

            assert.equal(request.uri, baseUrl + options.path);
            assert.equal(request.method, options.method);
            assert.equal(request.qs, options.payload); //This works because qa is a reference of payload
            assert.equal(request.headers['user-agent'], userAgent);
            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
            assert.isTrue(request.json);
            assert.isTrue(request.strictSSL);
        });

        it('Validate POST Request', function(){
            var options = {
                path: '/v1/payments',
                method: 'POST',
                payload: {
                    firstname: 'Ariel'
                }
            };

            var request = requestManager.buildRequest(options);

            assert.equal(request.uri, baseUrl + options.path);
            assert.equal(request.method, options.method);
            assert.equal(JSON.stringify(request.qs), JSON.stringify({ access_token: accessToken }));
            assert.equal(request.headers['user-agent'], userAgent);
            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
            assert.equal(request.json, options.payload);
            assert.isTrue(request.strictSSL);
        });

        it('Validate Empty Headers', function(){
            var options = {
                path: '/v1/payments',
                method: 'POST',
                payload: {
                    firstname: 'Ariel'
                },
                headers: {}
            };

            var request = requestManager.buildRequest(options);

            assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
            assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
        });

        it('Validate POST Request with form Mime Type', function(){
            var options = {
                path: '/v1/payments',
                method: 'POST',
                payload: {
                    firstname: 'Ariel'
                },
                headers: {
                    'accept': requestManager.FORM_MIME_TYPE,
                    'content-type': requestManager.FORM_MIME_TYPE
                }
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

        it('Validate POST Request with Validations', function(){
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
                }
            };

            var request = requestManager.buildRequest(options);

            assert.isObject(request);
        });

        it('Validate POST Request with Invalid Validation', function(){
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
                }
            };

            assert.throws(requestManager.buildRequest.bind(requestManager, options), 'The next fields are failing on validation: ".firstname": should be integer.');
        });
    });
});