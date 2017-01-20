/* eslint-env node, mocha */
var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');
var Promise = require('bluebird');
var assert = chai.assert;
var preapprovalModule = require('../lib/resources/preapproval');

chai.use(chaiAsPromised);

describe('Preapproval Resource', function () {
  it('Cancel', function () {
    var promise;
    var promiseCallback;
    var promiseObjectArg;
    var callback = sinon.spy();

    var stub = sinon.stub(preapprovalModule, 'update', function (id, putCallback) {
      return new Promise(function (resolve) {
        resolve({});
        return putCallback.apply(null, [null, {}]);
      });
    });

    promise = preapprovalModule.cancel(1);

    assert.isFulfilled(promise);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(stubArgs.id, 1);
      assert.equal(stubArgs.status, 'cancelled');
    });

    promiseCallback = preapprovalModule.cancel(1, callback);

    assert.isFulfilled(promiseCallback);

    promiseCallback.then(function(response){
      var callbackResponse = callback.args[0][1];

      assert.equal(JSON.stringify(callbackResponse), JSON.stringify({}));

      assert.isTrue(callback.called);
      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
    });

    promiseObjectArg = preapprovalModule.cancel({
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

  it('Refund', function () {
    var promise;
    var promiseCallback;
    var promiseObjectArg;
    var callback = sinon.spy();

    var stub = sinon.stub(preapprovalModule, 'update', function (id, putCallback) {
      return new Promise(function (resolve) {
        resolve({});
        return putCallback.apply(null, [null, {}]);
      });
    });

    promise = preapprovalModule.pause(1);

    assert.isFulfilled(promise);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(stubArgs.id, 1);
      assert.equal(stubArgs.status, 'paused');
    });

    promiseCallback = preapprovalModule.pause(1, callback);

    assert.isFulfilled(promiseCallback);

    promiseCallback.then(function(response){
      var callbackResponse = callback.args[0][1];

      assert.equal(JSON.stringify(callbackResponse), JSON.stringify({}));

      assert.isTrue(callback.called);
      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
    });

    promiseObjectArg = preapprovalModule.pause({
      id: 1
    });

    assert.isFulfilled(promiseObjectArg);

    promise.then(function(response){
      var stubArgs = stub.args[0][0];

      assert.isTrue(stub.called);
      assert.equal(JSON.stringify(response), JSON.stringify({}));
      assert.equal(stubArgs.id, 1);
      assert.equal(stubArgs.status, 'paused');
    });

    stub.restore();
  });
});
