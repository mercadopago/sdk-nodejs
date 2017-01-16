var chai = require('chai'),
    sinon = require('sinon'),
    chaiAsPromised = require("chai-as-promised"),
    Promise = require('bluebird');

chai.use(chaiAsPromised);

var assert = chai.assert,
    expect = chai.expect;

describe('Connect', function(){
    var connectModule = require('../lib/resources/connect');

    it('sendAuthorizationCode', function(){
        var userCredentialsResponse = {
            status: 200,
            body: {
                "access_token": "USER_AT",
                "public_key": "USER_PK",
                "refresh_token": "USER_RT",
                "live_mode": false,
                "user_id": 123456789,
                "token_type": "bearer",
                "expires_in": 15768000,
                "scope": "offline_access read write"
            }
        };

        var callback = sinon.spy();

        var getAuthroizationCodeStub = sinon.stub(connectModule, 'get', function(config, callback){
            return new Promise(function(resolve, reject){
                resolve(userCredentialsResponse);
                return callback.apply(null, [null, userCredentialsResponse]);
            });
        });

        var promise = connectModule.sendAuthorizationCode('clientId', 'redirectURI', callback);

        assert.isFulfilled(promise, userCredentialsResponse);

        promise.then(function(){
            assert.isTrue(callback.called);
            assert.isTrue(callback.calledWith(null, userCredentialsResponse));
        });

        getAuthroizationCodeStub.restore();
    });
});