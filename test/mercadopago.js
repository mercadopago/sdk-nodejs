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
    var sdk;

    it('Check new', function () {
      var stub = sinon.stub(console, 'warn', function () { /* Do Nothing */
      });

      sdk = new MercadoPago({
        access_token: accessToken
      });

      assert.isTrue(sdk instanceof MercadoPago);

      stub.restore();
    });
  });

  describe('Check Modules', function () {
    it('Configurations module', function () {
      assert.isObject(MercadoPago.configurations, 'Configurations module doesnt exists');
    });

    it('Utils module', function () {
      assert.isObject(MercadoPago.utils, 'Utils exists');
    });

    it('Payment module', function () {
      assert.isObject(MercadoPago.payment, 'Payment module doesnt exists');
    });

    it('Merchant Orders module', function () {
      assert.isObject(MercadoPago.merchant_orders, 'Merchant Orders module exists');
    });

    it('Customers module', function () {
      assert.isObject(MercadoPago.customers, 'Customers module doesnt exists');
    });

    it('Preferences module', function () {
      assert.isObject(MercadoPago.preferences, 'Preferences module doesnt exists');
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

  describe('Configure Method', function () {
    it('Check configuration is made', function () {
      MercadoPago.configure({
        client_id: clientId,
        client_secret: clientSecret
      });

      assert.equal(MercadoPago.configurations.getClientId(), clientId);
      assert.equal(MercadoPago.configurations.getClientSecret(), clientSecret);
    });
  });
});
