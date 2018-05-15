/* eslint-env node, mocha */
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
var assert = chai.assert;
var sinon = require('sinon');
var ipnModule = require('../lib/resources/ipn');
var preapprovalModule = require('../lib/resources/preapproval');
var merchantOrdersModule = require('../lib/resources/merchantOrders');
var Promise = require('bluebird');

chai.use(chaiAsPromised);

describe('IPN Manager', function () {
  describe('Manage', function () {
    it('Invalid Topic', function () {
      var callback = sinon.spy();
      var callbackError;

      var promise = ipnModule.manage({
        query: {
          id: 1,
          topic: 'invalid'
        }
      }, callback);

      promise.catch(function(){
        assert.isTrue(callback.called);

        callbackError = callback.args[0][0];

        assert.equal(callbackError.message,
          'Invalid Topic (invalid). The topics available are: preapproval, authorized_payment, payment, merchant_order');
      });
    });

    it('Invalid Topic - No Callback', function(){
      var promise = ipnModule.manage({
        query: {
          id: 1,
          topic: 'invalid'
        }
      });

      assert.isRejected(promise, 'Invalid Topic (invalid). The topics available are: preapproval, authorized_payment, payment');
    });

    it('Payment Topic', function () {
      var callback = sinon.spy();
      var getPaymentId;
      var callbackResponse;
      var promise;

      var getPaymentStub = sinon.stub(ipnModule, 'getPayment', function (options, methodCallback) {
        return methodCallback.apply(null, [null, {
          status: 200,
          body: {
            test_response: true
          }
        }]);
      });

      promise = ipnModule.manage({
          query: {
              id: 1,
              topic: 'payment'
          }
      }, callback);

      assert.isFulfilled(promise, { test_response: true });

      promise.then(function(){
          getPaymentId = getPaymentStub.args[0][0];

          assert.equal(getPaymentId, 1);

          assert.isTrue(callback.called);

          callbackResponse = callback.args[0][1];

          assert.equal(callbackResponse.id, 1);
          assert.equal(callbackResponse.topic, 'payment');
          assert.equal(callbackResponse.status, 200);
          assert.equal(JSON.stringify(callbackResponse.body), JSON.stringify({ test_response: true }));
      });

      ipnModule.getPayment.restore();
    });

    it('Authorized Payment Topic', function () {
      var callback = sinon.spy();
      var getAuthorizedPaymentId;
      var callbackResponse;
      var promise;

      var getAuthorizedPaymentStub = sinon.stub(ipnModule, 'getAuthorizedPayment', function (options, funcCallback) {
        return funcCallback.apply(null, [null, {
          status: 200,
          body: {
            test_response: true
          }
        }]);
      });

      var promise = ipnModule.manage({
          query: {
              id: 2,
              topic: 'authorized_payment'
          }
      }, callback);

      assert.isFulfilled(promise, { test_response: true });

      promise.then(function(){
          getAuthorizedPaymentId = getAuthorizedPaymentStub.args[0][0];

          assert.equal(getAuthorizedPaymentId, 2);

          assert.isTrue(callback.called);

          callbackResponse = callback.args[0][1];

          assert.equal(callbackResponse.id, 2);
          assert.equal(callbackResponse.topic, 'authorized_payment');
          assert.equal(callbackResponse.status, 200);
          assert.equal(JSON.stringify(callbackResponse.body), JSON.stringify({ test_response: true }));
      });

      ipnModule.getAuthorizedPayment.restore();
    });

    it('Preapproval Topic', function () {
      var callback = sinon.spy();
      var getPreapprovalId;
      var callbackResponse;
      var promise;

      var getPreApproval = sinon.stub(preapprovalModule, 'get', function (options, funcCallback) {
        return funcCallback.apply(null, [null, {
          status: 200,
          body: {
            test_response: true
          }
        }]);
      });

      promise = ipnModule.manage({
          query: {
              id: 3,
              topic: 'preapproval'
          }
      }, callback);

      assert.isFulfilled(promise, { test_response: true });

      promise.then(function(){
          getPreapprovalId = getPreApproval.args[0][0];

          assert.equal(getPreapprovalId, 3);

          assert.isTrue(callback.called);

          callbackResponse = callback.args[0][1];

          assert.equal(callbackResponse.id, 3);
          assert.equal(callbackResponse.topic, 'preapproval');
          assert.equal(callbackResponse.status, 200);
          assert.equal(JSON.stringify(callbackResponse.body), JSON.stringify({ test_response: true }));
      });

      preapprovalModule.get.restore();
    });

    it('MerchantOrders Topic', function () {
      var callback = sinon.spy();
      var getPreapprovalId;
      var callbackResponse;
      var promise;

      var getMerchantOrders = sinon.stub(merchantOrdersModule, 'get', function (options, funcCallback) {
        return funcCallback.apply(null, [null, {
          status: 200,
          body: {
            test_response: true
          }
        }]);
      });

      promise = ipnModule.manage({
        query: {
          id: 3,
          topic: 'merchant_order'
        }
      }, callback);

      assert.isFulfilled(promise, { test_response: true });

      promise.then(function(){
        getPreapprovalId = getMerchantOrders.args[0][0];

        assert.equal(getPreapprovalId, 3);

        assert.isTrue(callback.called);

        callbackResponse = callback.args[0][1];

        assert.equal(callbackResponse.id, 3);
        assert.equal(callbackResponse.topic, 'merchant_order');
        assert.equal(callbackResponse.status, 200);
        assert.equal(JSON.stringify(callbackResponse.body), JSON.stringify({ test_response: true }));
      });

      merchantOrdersModule.get.restore();
    });

    it('Error on manage', function () {
      var callback = sinon.spy();
      var callbackError;
      var promise;

      sinon.stub(ipnModule, 'getPayment', function (options, funcCallback) {
        return funcCallback.apply(null, [new Error('Error on getting payment'), null]);
      });

      var promise = ipnModule.manage({
          query: {
              id: 1,
              topic: 'payment'
          }
      }, callback);

      promise.isRejected(promise, 'Error on getting payment');

      promise.catch(function(){
          assert.isTrue(callback.called);

          callbackError = callback.args[0][0];

          assert.equal(callbackError.message, 'Error on getting payment');
      });

      ipnModule.getPayment.restore();
    });
  });
});
