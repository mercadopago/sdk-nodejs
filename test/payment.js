/* eslint-env node, mocha */
var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');
var Promise = require('bluebird');
var assert = chai.assert;
var paymentModule = require('../lib/resources/payment');
var collectionsModule = require('../lib/resources/collections');

chai.use(chaiAsPromised);

describe('Payment Resource', function () {
  it('Cancel Payment', function () {
    var promise;
    var promiseCallback;
    var promiseObjectArg;
    var callback = sinon.spy();

    var stub = sinon.stub(collectionsModule, 'put', function (id, putCallback) {
      return new Promise(function (resolve) {
        resolve({});
        return putCallback.apply(null, [null, {}]);
      });
    });

    promise = paymentModule.cancel(1);

    assert.isFulfilled(promise);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(stubArgs.id, 1);
      assert.equal(stubArgs.status, 'cancelled');
    });

    promiseCallback = paymentModule.cancel(1, callback);

    assert.isFulfilled(promiseCallback);

    promiseCallback.then(function(response){
      var callbackResponse = callback.args[0][1];

      assert.equal(JSON.stringify(callbackResponse), JSON.stringify({}));

      assert.isTrue(callback.called);
      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
    });

    promiseObjectArg = paymentModule.cancel({
      id: 1
    });

    assert.isFulfilled(promiseObjectArg);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(stubArgs.id, 1);
      assert.equal(stubArgs.status, 'cancelled');
    });

    stub.restore();
  });

  it('Refund Payment', function () {
    var promise;
    var promiseCallback;
    var promiseObjectArg;
    var callback = sinon.spy();

    var stub = sinon.stub(collectionsModule, 'put', function (id, putCallback) {
      return new Promise(function (resolve) {
        resolve({});
        return putCallback.apply(null, [null, {}]);
      });
    });

    promise = paymentModule.refund(1);

    assert.isFulfilled(promise);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(stubArgs.id, 1);
      assert.equal(stubArgs.status, 'refunded');
    });

    promiseCallback = paymentModule.refund(1, callback);

    assert.isFulfilled(promiseCallback);

    promiseCallback.then(function(response){
      var callbackResponse = callback.args[0][1];

      assert.equal(JSON.stringify(callbackResponse), JSON.stringify({}));

      assert.isTrue(callback.called);
      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
    });

    promiseObjectArg = paymentModule.refund({
      id: 1
    });

    assert.isFulfilled(promiseObjectArg);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(stubArgs.id, 1);
      assert.equal(stubArgs.status, 'refunded');
    });

    stub.restore();
  });

  it('Refund Partial', function () {
    var promise;
    var promiseCallback;
    var callback = sinon.spy();
    var refundPayload = {
      id: 1,
      metadata: {
        reason: 'Making a Refund'
      }
    };

    var stub = sinon.stub(collectionsModule.refunds, 'post', function (id, putCallback) {
      return new Promise(function (resolve) {
        resolve({});
        return putCallback.apply(null, [null, {}]);
      });
    });

    promise = paymentModule.refundPartial(refundPayload);

    assert.isFulfilled(promise);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(JSON.stringify(stubArgs), JSON.stringify(refundPayload));
    });

    promiseCallback = paymentModule.refundPartial({}, callback);

    assert.isFulfilled(promiseCallback);

    promiseCallback.then(function(response){
      var callbackResponse = callback.args[0][1];

      assert.equal(JSON.stringify(callbackResponse), JSON.stringify({}));

      assert.isTrue(callback.called);
      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
    });

    stub.restore();
  });
});
