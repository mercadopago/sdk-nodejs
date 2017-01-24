/* eslint-env node, mocha */
/* eslint-disable global-require */
var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;

chai.use(chaiAsPromised);

describe('Configurations Module', function () {
  var Promise;
  var configuration;
  var clientId = 'CLIENT_ID';
  var clientSecret = 'CLIENT_SECRET';
  var accessToken = 'ACCESS_TOKEN';
  var refreshToken = 'REFRESH_TOKEN';

  // Get an instance of configuration on require
  beforeEach(function () {
    Promise = require('bluebird');
    configuration = require('../lib/configurations.js');
  });

  // Delete the require cache after each test (Prevent Singleton)
  afterEach(function () {
    delete require.cache[require.resolve('../lib/configurations.js')];
    delete require.cache[require.resolve('bluebird')];
  });

  describe('Configure Errors', function () {
    it('Expect error on empty constructor', function () {
      assert.throws(configuration.configure, 'You must provide an Object with the configurations');
    });

    it('Expect error on empty configurations', function () {
      assert.throws(configuration.configure.bind(configuration, {}),
        'You must provide a method of authentication (client_id & client_secret or access_token)');
    });

    it('Expect error on client_id or client_secret only', function () {
      assert.throws(configuration.configure.bind(configuration, {
        client_id: clientId
      }), 'You must provide client_id and client_secret');

      assert.throws(configuration.configure.bind(configuration, {
        client_secret: clientSecret
      }), 'You must provide client_id and client_secret');
    });
  });

  describe('Configure Success', function () {
    it('Check client_id and client_secret variables are set', function () {
      configuration.configure({
        client_id: clientId,
        client_secret: clientSecret
      });

      assert.equal(configuration.getClientId(), clientId);
      assert.equal(configuration.getClientSecret(), clientSecret);
      assert.equal(configuration.getAccessToken(), undefined);
      assert.isFalse(configuration.sandbox);
      assert.isString(configuration.getUserAgent());
    });

    it('Check access_token is set', function () {
      configuration.configure({
        access_token: accessToken
      });

      assert.equal(configuration.getClientId(), undefined);
      assert.equal(configuration.getClientSecret(), undefined);
      assert.equal(configuration.getAccessToken(), accessToken);
      assert.isFalse(configuration.sandbox);
    });

    it('Check sandbox false value and show_promise_error false', function () {
      configuration.configure({
        client_id: clientId,
        client_secret: clientSecret,
        sandbox: false,
        show_promise_error: false
      });

      assert.isFalse(configuration.sandbox);
      assert.isFalse(configuration.show_promise_error);
    });

    it('Check sandbox true value', function () {
      configuration.configure({
        client_id: clientId,
        client_secret: clientSecret,
        sandbox: true,
        show_promise_error: true
      });

      assert.isTrue(configuration.sandbox);
      assert.isTrue(configuration.show_promise_error);
    });

    it('Expect error on client_id and client_secret already set', function () {
      configuration.configure({
        client_id: clientId,
        client_secret: clientSecret,
        sandbox: false
      });

      assert.throws(configuration.configure.bind(configuration, {
        client_id: clientId,
        client_secret: clientSecret
      }), 'Cant change client_id or client_secret because is already set');
    });

    it('Check failing promise without error', function () {
      var errorMessage = 'Error Ocurred';
      var method;

      configuration.configure({
        client_id: clientId,
        client_secret: clientSecret,
        show_promise_error: false
      });

      assert.isFalse(configuration.show_promise_error);

      method = function () {
        return new Promise(function (resolve, reject) {
          reject(new Error(errorMessage));
        });
      };

      method();
    });

    /* This is the only way to test the unhandled exception from bluebird */
    it('Check failing promise with error', function (done) {
      var errorMessage = 'Error Ocurred';
      var method;

      var warnStub = sinon.stub(console, 'warn', function () { /* Do Nothing */
      });

      configuration.configure({
        client_id: clientId,
        client_secret: clientSecret,
        show_promise_error: true
      });

      assert.isTrue(configuration.show_promise_error);

      method = function (callback) {
        return new Promise(function (resolve, reject) {
          reject(new Error(errorMessage));

          setTimeout(function () {
            callback.apply(null, [null, new Error(errorMessage)]);
            done();
          }, 500);
        });
      };

      method(function () {
        assert.isTrue(warnStub.called);
        warnStub.restore();
      });
    });
  });

  it('Check getBaseUrl', function () {
    // TODO: Change it to sinon spy or leave the URL?
    assert.equal(configuration.getBaseUrl(), 'https://api.mercadopago.com');
  });

  it('Check setAccessToken', function () {
    configuration.configure({
      access_token: accessToken
    });

    configuration.setAccessToken(accessToken);

    assert.equal(configuration.getAccessToken(), accessToken);
  });

  it('Check setRefreshToken', function () {
    configuration.setRefreshToken(refreshToken);

    assert.equal(configuration.getRefreshToken(), refreshToken);
  });

  it('Check if the tests are running', function () {
    assert.isBoolean(configuration.areTestsRunnning());
  });
});
