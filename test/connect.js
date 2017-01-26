var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;
var chaiAsPromised = require('chai-as-promised');
var Promise = require('bluebird');
var connectModule = require('../lib/resources/connect');
var requestManager = require('../lib/request-manager');
var configurations = require('../lib/configurations');

chai.use(chaiAsPromised);

describe('Connect', function () {
  it('sendAuthorizationCode', function () {
    var userCredentialsResponse = {
      status: 200,
      body: {
        access_token: 'USER_AT',
        public_key: 'USER_PK',
        refresh_token: 'USER_RT',
        live_mode: false,
        user_id: 123456789,
        token_type: 'bearer',
        expires_in: 15768000,
        scope: 'offline_access read write'
      }
    };

    var callback = sinon.spy();

    var getAuthroizationCodeStub = sinon.stub(connectModule, 'get', function (config, funcCallback) {
      return new Promise(function (resolve) {
        resolve(userCredentialsResponse);
        return funcCallback.apply(null, [null, userCredentialsResponse]);
      });
    });

    var promise = connectModule.sendAuthorizationCode('clientId', 'redirectURI', callback);

    assert.isFulfilled(promise, userCredentialsResponse);

    promise.then(function () {
      assert.isTrue(callback.called);
      assert.isTrue(callback.calledWith(null, userCredentialsResponse));
    });

    getAuthroizationCodeStub.restore();
  });

  it('getCredentialsAndConfigure', function () {
    var promise;
    var promiseWithoutCallback;
    var callback;
    var userCredentialsResponse = {
      status: 200,
      body: {
        access_token: 'USER_AT',
        public_key: 'USER_PK',
        refresh_token: 'USER_RT',
        live_mode: false,
        user_id: 123456789,
        token_type: 'bearer',
        expires_in: 15768000,
        scope: 'offline_access read write'
      }
    };

    var getUserCredentialsStub = sinon.stub(requestManager, 'getUserCredentials', function (config, funcCallback) {
      return new Promise(function (resolve) {
        resolve(userCredentialsResponse);
        return funcCallback.apply(null, [null, userCredentialsResponse]);
      });
    });

    callback = sinon.spy();

    promise = connectModule.getCredentialsAndConfigure('clientSecret', 'authorizationCode', 'redirectURI', callback);

    assert.isFulfilled(promise, userCredentialsResponse);

    promise.then(function () {
      assert.isTrue(callback.called);
      assert.isTrue(callback.calledWith(null, userCredentialsResponse));
      assert.equal(configurations.getAccessToken(), userCredentialsResponse.body.access_token);
    });

    promiseWithoutCallback = connectModule.getCredentialsAndConfigure('clientSecret', 'authorizationCode', 'redirectURI');

    assert.isFulfilled(promiseWithoutCallback, userCredentialsResponse);

    promiseWithoutCallback.then(function () {
      assert.equal(configurations.getAccessToken(), userCredentialsResponse.body.access_token);
    });

    getUserCredentialsStub.restore();
  });

  it('Fail getCredentialsAndConfigure', function () {
    var promise;
    var callback;
    var errorMessage = 'Error Ocurred';

    var getUserCredentialsStub = sinon.stub(requestManager, 'getUserCredentials', function (config, funcCallback) {
      return new Promise(function (resolve, reject) {
        reject(new Error(errorMessage));
        return funcCallback.apply(null, [new Error(errorMessage), null]);
      });
    });

    callback = sinon.spy();

    promise = connectModule.getCredentialsAndConfigure('clientSecret', 'authorizationCode', 'redirectURI', callback);

    assert.isRejected(promise);

    promise.catch(function () {
      var callbackError = callback.args[0][0];

      assert.isTrue(callback.called);
      assert.equal(callbackError.message, errorMessage);
    });

    getUserCredentialsStub.restore();
  });
});
