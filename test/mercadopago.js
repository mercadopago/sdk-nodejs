/* eslint-env node, mocha */
var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var MercadoPago = require('../index.js');

describe('Mercadopago SDK', function () {
  var clientId = 'CLIENT_ID';
  var clientSecret = 'CLIENT_SECRET';
  var accessToken = 'ACCESS_TOKEN';

  describe('Instance the SDK', function () {
    var consoleStub;

    beforeEach(function () {
      consoleStub = sinon.stub(console, 'warn', function () { /* Do Nothing */ });
    });

    afterEach(function () {
      consoleStub.restore();
    });

    it('Check new with access_token', function () {
      var sdk;
      var configureMock = sinon.mock(MercadoPago.prototype);

      configureMock.expects('configure').once().withExactArgs({
        show_promise_error: false,
        access_token: accessToken
      }).returns({});

      sdk = new MercadoPago(accessToken);

      assert.isTrue(sdk instanceof MercadoPago);
      assert.isTrue(configureMock.verify());

      configureMock.restore();
    });

    it('Check new with client_id and client_secret', function () {
      var sdk;
      var configureMock = sinon.mock(MercadoPago.prototype);

      configureMock.expects('configure').once().withExactArgs({
        show_promise_error: false,
        client_id: clientId,
        client_secret: clientSecret
      }).returns({});

      sdk = new MercadoPago(clientId, clientSecret);

      assert.isTrue(sdk instanceof MercadoPago);
      assert.isTrue(configureMock.verify());

      configureMock.restore();
    });

    it('Check new with invalid arguments', function () {
      assert.throws(MercadoPago.bind(), 'Invalid arguments. Use CLIENT_ID and CLIENT SECRET, or ACCESS_TOKEN');
    });
  });

  describe('Configure Method', function () {
    it('Check configuration is made - With Mock', function () {
      var configureArgs;
      var configureStub = sinon.stub(MercadoPago, 'configure');

      MercadoPago.configure({
        client_id: clientId,
        client_secret: clientSecret
      });

      configureArgs = configureStub.args[0][0];

      assert.equal(configureArgs.client_id, clientId);
      assert.equal(configureArgs.client_secret, clientSecret);

      configureStub.restore();
    });

    it('Check configuration is made - Without mocks', function () {
      MercadoPago.configure({
        client_id: clientId,
        client_secret: clientSecret
      });

      assert.equal(MercadoPago.configurations.getClientId(), clientId);
      assert.equal(MercadoPago.configurations.getClientSecret(), clientSecret);
    });
  });

  describe('Check Modules', function () {
    it('Check Modules', function () {
      assert.isObject(MercadoPago.configurations, 'Configurations module doesnt exists');
      assert.isObject(MercadoPago.utils, 'Utils exists');
      assert.isObject(MercadoPago.payment, 'Payment module doesnt exists');
      assert.isObject(MercadoPago.merchant_orders, 'Merchant Orders module exists');
      assert.isObject(MercadoPago.customers, 'Customers module doesnt exists');
      assert.isObject(MercadoPago.preferences, 'Preferences module doesnt exists');
      assert.isObject(MercadoPago.ipn, 'IPN module doesnt exists');
      assert.isObject(MercadoPago.connect, 'Connect module doesnt exists');
      assert.isObject(MercadoPago.money_requests, 'Money Requets module doesnt exists');
    });

    describe('Compatibility Layer', function () {
      it('SandboxMode', function () {
        assert.isFunction(MercadoPago.sandboxMode);
      });

      it('getAccessToken', function () {
        assert.isFunction(MercadoPago.getAccessToken);
      });

      it('get', function () {
        assert.isFunction(MercadoPago.get);
      });

      it('post', function () {
        assert.isFunction(MercadoPago.post);
      });

      it('put', function () {
        assert.isFunction(MercadoPago.put);
      });

      it('delete', function () {
        assert.isFunction(MercadoPago.delete);
      });

      it('createPreference', function () {
        assert.isFunction(MercadoPago.createPreference);
      });

      it('updatePreference', function () {
        assert.isFunction(MercadoPago.updatePreference);
      });

      it('getPreference', function () {
        assert.isFunction(MercadoPago.getPreference);
      });

      it('createPreapprovalPayment', function () {
        assert.isFunction(MercadoPago.createPreapprovalPayment);
      });

      it('updatePreapprovalPayment', function () {
        assert.isFunction(MercadoPago.updatePreapprovalPayment);
      });

      it('updatePreapprovalPayment', function () {
        assert.isFunction(MercadoPago.updatePreapprovalPayment);
      });

      it('searchPayment', function () {
        assert.isFunction(MercadoPago.searchPayment);
      });

      it('getPayment', function () {
        assert.isFunction(MercadoPago.getPayment);
      });

      it('getPaymentInfo', function () {
        assert.isFunction(MercadoPago.getPaymentInfo);
      });

      it('getAuthorizedPayment', function () {
        assert.isFunction(MercadoPago.getAuthorizedPayment);
      });

      it('refundPayment', function () {
        assert.isFunction(MercadoPago.refundPayment);
      });

      it('cancelPayment', function () {
        assert.isFunction(MercadoPago.cancelPayment);
      });

      it('cancelPreapprovalPayment', function () {
        assert.isFunction(MercadoPago.cancelPreapprovalPayment);
      });

      it('version', function () {
        assert.isString(MercadoPago.version);
      });
    });
  });
});
