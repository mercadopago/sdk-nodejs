/* eslint-env node, mocha */
var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;
var Promise = require('bluebird');
var requestLib = require('request');
var requestManager = require('../lib/request-manager');
var configurationModule = require('../lib/configurations');
var MercadopagoResponse = require('../lib/utils/mercadopagoResponse');
var MercadopagoError = require('../lib/utils/mercadopagoError');
var preConditions = require('../lib/precondition');

chai.use(chaiAsPromised);

var ACCESS_TOKEN = 'ACCESS_TOKEN';

describe('Request Manager', function () {
  describe('Dynamic method Creation', function () {
    it('Missing id parameter from arguments (GET)', function (done) {
      var callback = sinon.spy();

      var method = requestManager.describe({
        path: '/v1/payments/:id',
        method: 'GET'
      });

      var promise = method(callback);

      assert.isRejected(promise, 'Expecting parameters: id');

      promise.then(function () {
        done(new Error('Should be rejected'));
      }).catch(function () {
        var callbackError = callback.args[0][0];

        assert.isTrue(callback.called);
        assert.equal(callbackError, 'Error: Expecting parameters: id');

        done();
      });
    });

    it('Missing id parameter from JSON (POST)', function (done) {
      var callback = sinon.spy();

      var method = requestManager.describe({
        path: '/v1/payments/:id',
        method: 'POST'
      });

      var promise = method(callback);

      assert.isRejected(promise, 'The JSON is missing the following properties: id');

      promise.then(function () {
        done(new Error('Should be rejected'));
      }).catch(function () {
        var callbackError = callback.args[0][0];

        assert.isTrue(callback.called);
        assert.equal(callbackError, 'Error: The JSON is missing the following properties: id');

        done();
      });
    });

    it('Missing multiple parameters from JSON (POST)', function (done) {
      var callback = sinon.spy();

      var method = requestManager.describe({
        path: '/v1/payments/:id/:name',
        method: 'POST'
      });

      var promise = method(callback);

      assert.isRejected(promise, 'The JSON is missing the following properties: id, name');

      promise.then(function () {
        done(new Error('Should be rejected'));
      }).catch(function () {
        var callbackError = callback.args[0][0];

        assert.isTrue(callback.called);
        assert.equal(callbackError, 'Error: The JSON is missing the following properties: id, name');

        done();
      });
    });

    it('Error generating the access_token', function () {
      var tokenErrorMessage = 'Error getting the token';
      var promise;

      var method = requestManager.describe({
        path: '/v1/payments',
        method: 'POST'
      });

      sinon.stub(requestManager, 'generateAccessToken', function (callback) {
        return new Promise(function (resolve, reject) {
          reject(tokenErrorMessage);
          return callback.apply(null, [new Error(tokenErrorMessage), null]);
        });
      });

      promise = method();

      assert.isRejected(promise, tokenErrorMessage);

      requestManager.generateAccessToken.restore();
    });

    describe('Valid rest executions', function () {
      var execStub;

      var mercadoPagoResponse = {
        status: 200,
        body: {
          firstname: 'Ariel'
        }
      };

      beforeEach(function () {
        sinon.stub(requestManager, 'generateAccessToken', function (callback) {
          return new Promise(function (resolve) {
            resolve(ACCESS_TOKEN);
            return callback.apply(null, [null, ACCESS_TOKEN]);
          });
        });

        execStub = sinon.stub(requestManager, 'exec', function (options, callback) {
          return new Promise(function (resolve) {
            callback = preConditions.getCallback(callback);
            resolve(mercadoPagoResponse);
            return callback.apply(null, [null, mercadoPagoResponse]);
          });
        });
      });

      afterEach(function () {
        requestManager.generateAccessToken.restore();
        requestManager.exec.restore();
      });

      it('Without path parameters (GET)', function () {
        var callback = sinon.spy();

        var method = requestManager.describe({
          path: '/v1/payments',
          method: 'GET'
        });

        var promise = method(callback);

        var execOptionParams;

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          // Validate exec params
          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/v1/payments');
          assert.equal(execOptionParams.method, 'GET');
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
        });
      });

      it('Without path parameters and no callback (GET)', function () {
        var method = requestManager.describe({
          path: '/v1/payments',
          method: 'GET'
        });

        var promise = method();

        assert.isFulfilled(promise, mercadoPagoResponse);
      });

      it('Validate base_url option (GET)', function () {
        var method = requestManager.describe({
          base_url: 'http://auth.mercadopago.com',
          path: '/v1/payments',
          method: 'GET'
        });

        var promise = method();

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          var execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.base_url, 'http://auth.mercadopago.com');
        });
      });

      it('With path parameters on arguments (GET)', function () {
        var callback = sinon.spy();

        var method = requestManager.describe({
          path: '/v1/payments/:id',
          method: 'GET'
        });

        var promise = method(1, callback);

        var execOptionParams;

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          // Validate exec params
          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/v1/payments/1');
          assert.equal(execOptionParams.method, 'GET');
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
        });
      });

      it('With path_sandbox_prefix (GET)', function () {
        var callback = sinon.spy();

        var promise;
        var execOptionParams;

        var method = requestManager.describe({
          path: '/v1/payments',
          method: 'GET',
          path_sandbox_prefix: true
        });

        // Set sandbox mode for path_sandbox_prefix
        configurationModule.sandbox = true;

        promise = method(1, {
          test_value: true
        }, callback);

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          // Validate exec params
          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/sandbox/v1/payments');
          assert.equal(execOptionParams.method, 'GET');
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
        });

        // Change it back to false
        configurationModule.sandbox = false;
      });

      it('With path parameters on JSON (POST)', function () {
        var execOptionParams;
        var callback = sinon.spy();

        var payload = {
          id: 1
        };

        var method = requestManager.describe({
          path: '/v1/payments/:id',
          method: 'POST'
        });

        var promise = method(payload, callback);

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          // Validate exec params
          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/v1/payments/1');
          assert.equal(execOptionParams.method, 'POST');
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(payload));
        });
      });

      it('With path parameters on JSON with configurations (POST)', function () {
        var execOptionParams;
        var callback = sinon.spy();
        var payload = {
          id: 1
        };

        var method = requestManager.describe({
          path: '/v1/payments/:id',
          method: 'POST'
        });

        var promise = method(payload, {
          test_value: true
        }, callback);

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          // Validate exec params
          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/v1/payments/1');
          assert.equal(execOptionParams.method, 'POST');
          assert.isTrue(execOptionParams.config.test_value);
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(payload));
        });
      });

      it('Without path parameters on JSON and invalid configurations (POST)', function () {
        var execOptionParams;

        var callback = sinon.spy();

        var method = requestManager.describe({
          path: '/v1/payments',
          method: 'POST'
        });

        var promise = method('', '', callback);

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          // Validate exec params
          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/v1/payments');
          assert.equal(execOptionParams.method, 'POST');
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({}));
          assert.equal(JSON.stringify(execOptionParams.config), JSON.stringify({}));
        });
      });

      it('With payload (POST)', function () {
        var execOptionParams;
        var callback = sinon.spy();
        var testPayload = {
          description: 'MercadoPago Sale'
        };
        var method;
        var promise;

        this.schema = {};
        this.idempotency = true;

        method = requestManager.describe({
          path: '/v1/payments',
          method: 'POST'
        });

        promise = method(testPayload, callback);

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/v1/payments');
          assert.equal(execOptionParams.method, 'POST');
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(testPayload));
          assert.isFalse(execOptionParams.idempotency);
        });
      });

      it('With idempotency on resource (POST)', function () {
        var execOptionParams;
        var callback = sinon.spy();
        var testPayload = {
          description: 'MercadoPago Sale'
        };

        var resource = {
          idempotency: true,
          method: requestManager.describe({
            path: '/v1/payments',
            method: 'POST'
          })
        };

        var promise = resource.method(testPayload, callback);

        assert.isFulfilled(promise, mercadoPagoResponse);

        promise.then(function () {
          assert.isTrue(callback.called);
          assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

          execOptionParams = execStub.args[0][0];

          assert.equal(execOptionParams.path, '/v1/payments');
          assert.equal(execOptionParams.method, 'POST');
          assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify(testPayload));
          assert.isTrue(execOptionParams.idempotency);
        });
      });
    });
  });

  describe('Generate Token', function () {
    var execStub;

    var mpTokenResponse = {
      status: 200,
      body: {
        access_token: ACCESS_TOKEN,
        refresh_token: 'REFRESH_TOKEN'
      }
    };

    beforeEach(function () {
      execStub = sinon.stub(requestManager, 'exec', function (options, callback) {
        return new Promise(function (resolve) {
          callback = preConditions.getCallback(callback);
          resolve(mpTokenResponse);
          return callback.apply(null, [null, mpTokenResponse]);
        });
      });
    });

    afterEach(function () {
      requestManager.exec.restore();
      // Empty the accessToken
      configurationModule.setAccessToken('');
    });

    it('Already have access_token', function (done) {
      var callback = sinon.spy();
      var accessToken = 'STUB_ACCESS_TOKEN';
      var promise;

      sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);

      promise = requestManager.generateAccessToken(callback);

      assert.isFulfilled(promise, accessToken);

      promise.then(function () {
        assert.isTrue(callback.called);
        assert.isTrue(callback.calledWith(null, accessToken));

        done();
      }).catch(function (error) {
        done(error);
      });

      configurationModule.getAccessToken.restore();
    });

    it('Already have access_token, no callback', function () {
      var accessToken = 'STUB_ACCESS_TOKEN';
      var promise;

      sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);

      promise = requestManager.generateAccessToken();

      assert.isFulfilled(promise, accessToken);

      configurationModule.getAccessToken.restore();
    });

    it('Missing client_id and client_secret Error', function (done) {
      var callback = sinon.spy();
      var promise;
      var getTokenError;

      sinon.stub(configurationModule, 'getClientId').returns();
      sinon.stub(configurationModule, 'getClientSecret').returns();

      promise = requestManager.generateAccessToken(callback);

      assert.isRejected(promise, 'Must set client_id and client_secret');

      promise.then(function () {
        done(new Error('Should be rejected'));
      }).catch(function () {
        getTokenError = callback.args[0][0];

        assert.equal(getTokenError.message, 'Must set client_id and client_secret');

        done();
      });

      configurationModule.getClientId.restore();
      configurationModule.getClientSecret.restore();
    });

    it('Get the access_token from MercadoPago API', function (done) {
      var callback = sinon.spy();
      var clientId = 'CLIENT_ID';
      var clientSecret = 'CLIENT_SECRET';
      var promise;
      var execOptionParams;

      sinon.stub(configurationModule, 'getClientId').returns(clientId);
      sinon.stub(configurationModule, 'getClientSecret').returns(clientSecret);

      promise = requestManager.generateAccessToken(callback);

      assert.isFulfilled(promise, mpTokenResponse.body.access_token);

      promise.then(function () {
        execOptionParams = execStub.args[0][0];

        assert.equal(execOptionParams.path, '/oauth/token');
        assert.equal(execOptionParams.method, 'POST');
        assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'client_credentials'
        }));

        assert.isTrue(callback.called);
        assert.isTrue(callback.calledWith(null, mpTokenResponse.body.access_token));

        done();
      }).catch(function (error) {
        done(error);
      });

      configurationModule.getClientId.restore();
      configurationModule.getClientSecret.restore();
    });

    it('Failing getting the access_token from MercadoPago API', function (done) {
      var callback = sinon.spy();
      var clientId = 'CLIENT_ID';
      var clientSecret = 'CLIENT_SECRET';
      var errorMessage = 'Error getting token';
      var promise;
      var callbackError;

      // Restore the exec on beforeEach
      requestManager.exec.restore();

      // Create another stub that fails
      execStub = sinon.stub(requestManager, 'exec', function (options, funcCallback) {
        var errorToReturn = new Error(errorMessage);

        funcCallback = preConditions.getCallback(funcCallback);
        funcCallback.apply(null, [errorToReturn, null]);

        return Promise.reject(errorToReturn);
      });

      sinon.stub(configurationModule, 'getClientId').returns(clientId);
      sinon.stub(configurationModule, 'getClientSecret').returns(clientSecret);

      promise = requestManager.generateAccessToken(callback);

      assert.isRejected(promise, errorMessage);

      promise.then(function () {
        done(new Error('Should be rejected'));
      }).catch(function () {
        assert.isTrue(callback.called);

        callbackError = callback.args[0][0];

        assert.equal(callbackError.message, errorMessage);

        done();
      });

      configurationModule.getClientId.restore();
      configurationModule.getClientSecret.restore();
    });
  });

  describe('Refresh Token', function () {
    var execStub;

    var mpTokenResponse = {
      status: 200,
      body: {
        access_token: ACCESS_TOKEN,
        refresh_token: 'REFRESH_TOKEN'
      }
    };

    beforeEach(function () {
      execStub = sinon.stub(requestManager, 'exec', function (options, callback) {
        return new Promise(function (resolve) {
          callback = preConditions.getCallback(callback);
          resolve(mpTokenResponse);
          return callback.apply(null, [null, mpTokenResponse]);
        });
      });
    });

    afterEach(function () {
      requestManager.exec.restore();
      // Empty the accessToken
      configurationModule.setAccessToken('');
    });

    it('Missing refres_token property', function (done) {
      var callback = sinon.spy();
      var promise;
      var callbackError;

      sinon.stub(configurationModule, 'getRefreshToken').returns('');

      promise = requestManager.refreshAccessToken(callback);

      assert.isRejected(promise, 'You need the refresh_token to refresh the access_token');

      promise.then(function() {
        done(new Error('Should be rejected'));
      }).catch(function () {
        assert.isTrue(callback.called);

        callbackError = callback.args[0][0];

        assert.equal(callbackError.message, 'You need the refresh_token to refresh the access_token');

        done();
      });

      configurationModule.getRefreshToken.restore();
    });

    it('Missing refres_token property, no callback', function () {
      var promise;

      sinon.stub(configurationModule, 'getRefreshToken').returns('');

      promise = requestManager.refreshAccessToken();

      assert.isRejected(promise, 'You need the refresh_token to refresh the access_token');

      configurationModule.getRefreshToken.restore();
    });

    it('Get access_token from MercadoPago API', function (done) {
      var callback = sinon.spy();
      var accessToken = ACCESS_TOKEN;
      var refreshToken = 'REFRESH_TOKEN';
      var promise;
      var execOptionParams;

      sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);
      sinon.stub(configurationModule, 'getRefreshToken').returns(refreshToken);

      promise = requestManager.refreshAccessToken(callback);

      assert.isFulfilled(promise, mpTokenResponse.body.access_token);

      promise.then(function () {
        execOptionParams = execStub.args[0][0];

        assert.equal(execOptionParams.path, '/oauth/token');
        assert.equal(execOptionParams.method, 'POST');
        assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({
          client_secret: accessToken,
          grant_type: 'refresh_token'
        }));

        assert.isTrue(callback.called);
        assert.isTrue(callback.calledWith(null, mpTokenResponse.body.access_token));

        done();
      }).catch(function (error) {
        done(error);
      });

      configurationModule.getAccessToken.restore();
      configurationModule.getRefreshToken.restore();
    });

    it('Failing refreshing the access_token', function (done) {
      var errorMessage = 'Error refreshing token';
      var callback = sinon.spy();
      var accessToken = ACCESS_TOKEN;
      var refreshToken = 'REFRESH_TOKEN';
      var promise;
      var callbackError;

      // Restore the exec on beforeEach
      requestManager.exec.restore();

      // Create another stub that fails
      execStub = sinon.stub(requestManager, 'exec', function (options, funcCallback) {
        var errorToReturn = new Error(errorMessage);

        funcCallback = preConditions.getCallback(funcCallback);
        funcCallback.apply(null, [errorToReturn, null]);

        return Promise.reject(errorToReturn);
      });

      sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);
      sinon.stub(configurationModule, 'getRefreshToken').returns(refreshToken);

      promise = requestManager.refreshAccessToken(callback);
      assert.isRejected(promise, errorMessage);


      promise.then(function() {
        done(new Error('Should be rejected'));
      }).catch(function () {
        callbackError = callback.args[0][0];

        assert.equal(callbackError.message, errorMessage);

        done();
      });

      configurationModule.getAccessToken.restore();
      configurationModule.getRefreshToken.restore();
    });
  });

  describe('Get User Credentials', function () {
    var userCredentialsResponse = {
        status: 200,
        body: {
          success: true
        }
      },
      execStub;

    beforeEach(function () {
      execStub = sinon.stub(requestManager, 'exec', function (options, callback) {
        return new Promise(function (resolve) {
          callback = preConditions.getCallback(callback);
          resolve(userCredentialsResponse);
          return callback.apply(null, [null, userCredentialsResponse]);
        });
      });
    });

    afterEach(function () {
      requestManager.exec.restore();
    });

    it('Get user credentials from MercadoPago API', function (done) {
      var callback = sinon.spy();
      var execOptionParams;

      var promise = requestManager.getUserCredentials('secret', 'code', 'uri', callback);

      assert.isFulfilled(promise, userCredentialsResponse);

      promise.then(function () {
        execOptionParams = execStub.args[0][0];

        assert.equal(execOptionParams.path, '/oauth/token');
        assert.equal(execOptionParams.method, 'POST');
        assert.equal(JSON.stringify(execOptionParams.payload), JSON.stringify({
          client_secret: 'secret',
          code: 'code',
          redirect_uri: 'uri',
          grant_type: 'authorization_code'
        }));

        assert.isTrue(callback.called);
        assert.isTrue(callback.calledWith(null, userCredentialsResponse));

        done();
      }).catch(function (error) {
        done(error);
      });
    });

    it('Get user credentials from MercadoPago API without callback', function () {
      var promise = requestManager.getUserCredentials('secret', 'code', 'uri');

      assert.isFulfilled(promise, userCredentialsResponse);
    });

    it('Failing getting user credentials from MercadoPago API', function (done) {
      var errorMessage = 'Error refreshing token';
      var callback = sinon.spy();
      var promise;

      // Restore the exec on beforeEach
      requestManager.exec.restore();

      // Create another stub that fails
      execStub = sinon.stub(requestManager, 'exec', function (options, callback) {
        var errorToReturn = new Error(errorMessage);

        callback = preConditions.getCallback(callback);
        callback.apply(null, [errorToReturn, null]);

        return Promise.reject(errorToReturn);
      });

      promise = requestManager.getUserCredentials('secret', 'code', 'uri', callback);

      assert.isRejected(promise, errorMessage);

      promise.then(function () {
        done(new Error('Should be rejected'));
      }).catch(function () {
        var callbackError = callback.args[0][0];

        assert.equal(callbackError.message, errorMessage);

        done();
      });
    });
  });

  describe('Build Request', function () {
    var baseUrl = 'http://api.mercadopago.com';
    var accessToken = ACCESS_TOKEN;
    var userAgent = 'USER_AGENT';

    beforeEach(function () {
      sinon.stub(configurationModule, 'getUserAgent').returns(userAgent);
      sinon.stub(configurationModule, 'getBaseUrl').returns(baseUrl);
      sinon.stub(configurationModule, 'getAccessToken').returns(accessToken);
    });

    afterEach(function () {
      configurationModule.getUserAgent.restore();
      configurationModule.getBaseUrl.restore();
      configurationModule.getAccessToken.restore();
    });

    it('Valid GET Request with querystring', function () {
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

    it('Valid GET Request with base_url', function () {
      var options = {
        config: {},
        path: '/v1/payments',
        method: 'GET',
        base_url: 'http://auth.mercadopago.com',
        access_token: accessToken,
      };

      var request = requestManager.buildRequest(options);

      assert.equal(request.uri, 'http://auth.mercadopago.com' + options.path);
      assert.equal(request.method, options.method);
      assert.equal(JSON.stringify(request.qs), JSON.stringify({access_token: accessToken}));
      assert.equal(request.headers['user-agent'], userAgent);
      assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
      assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
      assert.isTrue(request.json);
      assert.isTrue(request.strictSSL);
    });

    it('Valid GET Request without querystring', function () {
      var options = {
        config: {},
        path: '/v1/payments',
        method: 'GET',
        access_token: accessToken,
      };

      var request = requestManager.buildRequest(options);

      assert.equal(request.uri, baseUrl + options.path);
      assert.equal(request.method, options.method);
      assert.equal(JSON.stringify(request.qs), JSON.stringify({
        access_token: accessToken
      }));
      assert.equal(request.headers['user-agent'], userAgent);
      assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
      assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
      assert.isTrue(request.json);
      assert.isTrue(request.strictSSL);
    });

    it('Valid POST Request with specific idempotency', function () {
      var fakeIdempotency = 'fake-uuid';
      var options = {
        path: '/v1/payments',
        method: 'POST',
        payload: {
          firstname: 'Ariel'
        },
        config: {
          idempotency: fakeIdempotency
        },
        access_token: accessToken,
      };

      var request = requestManager.buildRequest(options);

      assert.equal(request.uri, baseUrl + options.path);
      assert.equal(request.method, options.method);
      assert.equal(JSON.stringify(request.qs), JSON.stringify({
        access_token: accessToken
      }));
      assert.equal(request.headers['user-agent'], userAgent);
      assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
      assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
      assert.equal(request.headers['x-idempotency-key'], fakeIdempotency);
      assert.equal(request.json, options.payload);
      assert.isTrue(request.strictSSL);
    });

    it('Valid POST Request with specific without specific idempotency', function () {
      var options = {
        path: '/v1/payments',
        method: 'POST',
        payload: {
          firstname: 'Ariel'
        },
        config: {},
        idempotency: true,
        access_token: accessToken,
      };

      var request = requestManager.buildRequest(options);

      assert.equal(request.uri, baseUrl + options.path);
      assert.equal(request.method, options.method);
      assert.equal(JSON.stringify(request.qs), JSON.stringify({
        access_token: accessToken
      }));
      assert.equal(request.headers['user-agent'], userAgent);
      assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
      assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
      assert.isString(request.headers['x-idempotency-key']);
      assert.equal(request.json, options.payload);
      assert.isTrue(request.strictSSL);
    });

    it('Validate with empty headers option', function () {
      var options = {
        path: '/v1/payments',
        method: 'POST',
        headers: {},
        payload: {
          firstname: 'Ariel'
        },
        config: {},
        access_token: accessToken,
      };

      var request = requestManager.buildRequest(options);

      assert.equal(request.headers.accept, requestManager.JSON_MIME_TYPE);
      assert.equal(request.headers['content-type'], requestManager.JSON_MIME_TYPE);
      assert.isUndefined(request.headers['x-idempotency-key']);
    });

    it('Validate POST Request with form different Mime Type (accept, content-type)', function () {
      var options = {
        path: '/v1/payments',
        method: 'POST',
        payload: {
          firstname: 'Ariel'
        },
        headers: {
          accept: requestManager.FORM_MIME_TYPE,
          'content-type': requestManager.FORM_MIME_TYPE
        },
        config: {},
        access_token: accessToken,
      };

      var request = requestManager.buildRequest(options);

      assert.equal(request.uri, baseUrl + options.path);
      assert.equal(request.method, options.method);
      assert.equal(JSON.stringify(request.qs), JSON.stringify({
        access_token: accessToken
      }));
      assert.equal(request.headers['user-agent'], userAgent);
      assert.equal(request.headers.accept, requestManager.FORM_MIME_TYPE);
      assert.equal(request.headers['content-type'], requestManager.FORM_MIME_TYPE);
      assert.equal(request.form, options.payload);
      assert.isTrue(request.json);
      assert.isTrue(request.strictSSL);
    });

    it('Validate POST Request with schema validation', function () {
      var options = {
        path: '/v1/payments',
        method: 'POST',
        payload: {
          firstname: 'Ariel'

        },
        schema: {
          properties: {
            firstname: {
              type: 'string'
            }
          }
        },
        config: {},
        access_token: accessToken,
      };

      var request = requestManager.buildRequest(options);

      assert.isObject(request);
    });

    it('Validate POST Request with errors on schema validation', function () {
      var options = {
        path: '/v1/payments',
        method: 'POST',
        payload: {
          firstname: 'Ariel'
        },
        schema: {
          properties: {
            firstname: {
              type: 'integer'
            }
          }
        },
        config: {}
      };

      assert.throws(requestManager.buildRequest.bind(requestManager, options),
        'The next fields are failing on validation: ".firstname": should be integer.');
    });
  });

  describe('Execute method', function () {
    var fakeIdempotency = 'fake-uuid';
    var buildRequestValidResponse = {
      headers: {
        'x-idempotency-key': fakeIdempotency
      }
    };

    it('Error on buildRequest', function () {
      var callback = sinon.spy();
      var errorMessage = 'Fail on request';
      var promise;
      var callbackErrors;

      sinon.stub(requestManager, 'buildRequest').throws(new Error(errorMessage));

      promise = requestManager.exec({}, callback);

      callbackErrors = callback.args[0][0];

      assert.equal(callbackErrors.message, errorMessage);

      requestManager.buildRequest.restore();

      assert.isRejected(promise, errorMessage);
    });

    it('Error executing the request', function () {
      var callback = sinon.spy();
      var errorMessage = 'Fail executing request';
      var promise;
      var callbackErrors;

      sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

      sinon.stub(requestLib, 'Request', function (params) {
        return params.callback.apply(null, [new Error(errorMessage), null, null]);
      });

      promise = requestManager.exec({}, callback);

      callbackErrors = callback.args[0][0];

      assert.equal(callbackErrors.message, errorMessage);

      requestManager.buildRequest.restore();
      requestLib.Request.restore();

      assert.isRejected(promise, errorMessage);
    });

    it('Invalid HTTP Status Code on response from MercadoPago API', function () {
      var callback = sinon.spy();
      var errorMessage = 'Error on MercadoPago API';
      var promise;
      var callbackErrors;

      sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

      sinon.stub(requestLib, 'Request', function (params) {
        return params.callback.apply(null, [null, {
          statusCode: 500
        }, {
          message: errorMessage
        }]);
      });

      promise = requestManager.exec({}, callback);

      callbackErrors = callback.args[0][0];

      assert.instanceOf(callbackErrors, MercadopagoError);
      assert.equal(callbackErrors.message, errorMessage);
      assert.equal(callbackErrors.idempotency, buildRequestValidResponse.headers['x-idempotency-key']);

      requestManager.buildRequest.restore();
      requestLib.Request.restore();

      assert.isRejected(promise, errorMessage);
    });

    it('Valid response with correct HTTP Post', function () {
      var callback = sinon.spy();
      var promise;
      var callbackErrors;

      sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

      sinon.stub(requestLib, 'Request', function (params) {
        return params.callback.apply(null, [null, {
          statusCode: 500
        }, {}]);
      });

      promise = requestManager.exec({}, callback);

      callbackErrors = callback.args[0][0];

      assert.equal(callbackErrors.message, 'Unknown Error');

      requestManager.buildRequest.restore();
      requestLib.Request.restore();

      assert.isRejected(promise, 'Unknown Error');
    });

    it('Valid Response From MercadoPago API', function () {
      var callback = sinon.spy();
      var responseBody = {
        firstname: 'Ariel'
      };
      var promise;
      var callbackResponse;
      var mpResponse;

      sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

      sinon.stub(requestLib, 'Request', function (params) {
        return params.callback.apply(null, [null, {
          statusCode: 200
        }, responseBody]);
      });

      promise = requestManager.exec({}, callback);

      callbackResponse = callback.args[0][1];

      mpResponse = new MercadopagoResponse(responseBody, 200, fakeIdempotency);

      assert.instanceOf(callbackResponse, MercadopagoResponse);
      assert.equal(JSON.stringify(callbackResponse), JSON.stringify(mpResponse));

      assert.isFulfilled(promise, mpResponse);

      requestManager.buildRequest.restore();
      requestLib.Request.restore();
    });

    it('Valid Response From MercadoPago API (Using ETAG Cache)', function (done) {
      var callback = sinon.spy();
      var responseBody = {
        firstname: 'Ariel'
      };
      var tag = 'e-tag-from-mercadopago';
      var promise;
      var callbackResponse;
      var mpResponse;
      var promiseWithCache;
      var requestStub;
      var requestArguments;

      sinon.stub(requestManager, 'buildRequest').returns(buildRequestValidResponse);

      requestStub = sinon.stub(requestLib, 'Request', function (params) {
        return params.callback.apply(null, [null, {
          statusCode: 200,
          headers: {
            etag: tag
          }
        }, responseBody]);
      });

      promise = requestManager.exec({}, callback);

      assert.isFulfilled(promise);

      promise.then(function () {
        callbackResponse = callback.args[0][1];

        mpResponse = new MercadopagoResponse(responseBody, 200, fakeIdempotency);

        assert.instanceOf(callbackResponse, MercadopagoResponse);
        assert.equal(JSON.stringify(callbackResponse), JSON.stringify(mpResponse));

        promiseWithCache = requestManager.exec({}, callback);

        assert.isFulfilled(promiseWithCache);

        promiseWithCache.then(function () {
          requestArguments = requestStub.args[0][0];

          callbackResponse = callback.args[0][1];

          mpResponse = new MercadopagoResponse(responseBody, 200, fakeIdempotency);

          assert.instanceOf(callbackResponse, MercadopagoResponse);
          assert.equal(JSON.stringify(callbackResponse), JSON.stringify(mpResponse));

          // Check that the etag is send on header (Check Cache Library)
          assert.equal(requestArguments.headers['If-None-Match'], tag);
        });

        requestManager.buildRequest.restore();
        requestLib.Request.restore();

        done();
      }).catch(function (error) {
        done(error);
      });
    });
  });

  describe('Override Access Token', function () {
    var execStub;

    var mercadoPagoResponse = {
      status: 200,
      body: {
        firstname: 'Ariel'
      }
    };

    beforeEach(function () {
      sinon.stub(requestManager, 'generateAccessToken', function (callback) {
        return new Promise(function (resolve) {
          resolve(ACCESS_TOKEN);
          return callback.apply(null, [null, ACCESS_TOKEN]);
        });
      });

      execStub = sinon.stub(requestManager, 'exec', function (options, callback) {
        return new Promise(function (resolve) {
          callback = preConditions.getCallback(callback);
          resolve(mercadoPagoResponse);
          return callback.apply(null, [null, mercadoPagoResponse]);
        });
      });
    });

    afterEach(function () {
      requestManager.generateAccessToken.restore();
      requestManager.exec.restore();
    });

    it('Without access_token on config', function (done) {
      var execOptionParams;
      var callback = sinon.spy();
      var testPayload = {
        description: 'MercadoPago Sale'
      };

      var resource = {
        method: requestManager.describe({
          path: '/v1/payments',
          method: 'POST'
        })
      };

      var promise = resource.method(testPayload, callback);

      assert.isFulfilled(promise, mercadoPagoResponse);

      promise.then(function () {
        assert.isTrue(callback.called);
        assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

        execOptionParams = execStub.args[0][0];

        assert.equal(execOptionParams.access_token, ACCESS_TOKEN);

        done();
      }).catch(function (error) {
        done(error);
      });
    });

    it('With access_token on config', function (done) {
      var execOptionParams;
      var callback = sinon.spy();
      var testPayload = {
        description: 'MercadoPago Sale'
      };

      var resource = {
        method: requestManager.describe({
          path: '/v1/payments',
          method: 'POST'
        })
      };

      var promise = resource.method(testPayload, {
        access_token: '123',
      }, callback);

      assert.isFulfilled(promise, mercadoPagoResponse);

      promise.then(function () {
        assert.isTrue(callback.called);
        assert.isTrue(callback.calledWith(null, mercadoPagoResponse));

        execOptionParams = execStub.args[0][0];

        assert.equal(execOptionParams.access_token, '123');

        done();
      }).catch(function (error) {
        done(error);
      });
    });
  });
});
