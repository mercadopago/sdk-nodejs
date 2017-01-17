var chai = require('chai');
var sinon = require('sinon');
var assert = chai.assert;
var chaiAsPromised = require('chai-as-promised');
var Promise = require('bluebird');
var connectModule = require('../lib/resources/connect');

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
});
