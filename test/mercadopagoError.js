/* eslint-env node, mocha */
var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');
var assert = chai.assert;
var Promise = require('bluebird');
var MercadopagoResponse = require('../lib/utils/mercadopagoResponse');
var MercadopagoError = require('../lib/utils/mercadopagoError');
var requestManager = require('../lib/request-manager');

chai.use(chaiAsPromised);

describe('MercadopagoError Class', function () {
  describe('Constructor', function () {
    it('with no arguments', function () {
      var mpError = new MercadopagoError();

      assert.instanceOf(mpError, MercadopagoError, 'mpError is an instance of MercadopagoError');
      assert.equal(mpError.name, 'MercadoPagoError');
      assert.equal(mpError.message, 'Unknown Error');
      assert.equal(mpError.cause, 'Unknown Cause');
      assert.equal(mpError.status, 500);
      assert.isUndefined(mpError.idempotency);
    });

    it('with arguments', function () {
      var mpError = new MercadopagoError('Time-Out', 'Cause', 408, 'idempotency');

      assert.instanceOf(mpError, MercadopagoError, 'mpError is an instance of MercadopagoError');
      assert.equal(mpError.name, 'MercadoPagoError');
      assert.equal(mpError.cause, 'Cause');
      assert.equal(mpError.message, 'Time-Out');
      assert.equal(mpError.status, 408);
      assert.equal(mpError.idempotency, 'idempotency');
    });
  });

  describe('Retry Operation', function () {
    it('retry() - Retry without options and requestManager', function () {
      var promise;
      var callback = sinon.spy();
      var mpError = new MercadopagoError('Message', 'Cause', 500, 'idempotency-id');

      promise = mpError.retry(callback);

      assert.isRejected(promise);

      promise.catch(function () {
        var callbackError = callback.args[0][0];

        assert.instanceOf(callbackError, Error);
        assert.equal(callbackError.message, 'Cant retry this operation');
      });
    });

    it('retry() - Retry the operation from mercadopagoError', function () {
      var promise;
      var callback = sinon.spy();
      var execOptions = {
        config: {
          qs: {}
        }
      };
      var mpError = new MercadopagoError('Message', 'Cause', 500, 'idempotency-id', execOptions, requestManager);
      var mpResponse = new MercadopagoResponse({
        firstname: 'Ariel'
      }, 200, 'idempotency', {}, execOptions, requestManager);

      var generateToken = sinon.stub(requestManager, 'generateAccessToken', function (callbackToken) {
        return new Promise(function (resolve) {
          resolve('ACCESS_TOKEN');
          return callbackToken.apply(null, ['ACCESS_TOKEN', null]);
        });
      });

      var requestStub = sinon.stub(requestManager, 'exec', function (options, callbackExec) {
        return new Promise(function (resolve) {
          resolve(mpResponse);
          return callbackExec.apply(null, [mpResponse, null]);
        });
      });

      promise = mpError.retry(callback);

      assert.isFulfilled(promise);

      promise.then(function () {
        var callbackResponse = callback.args[0][1];

        assert.instanceOf(callbackResponse, MercadopagoResponse);
        assert.equal(JSON.stringify(callbackResponse), JSON.stringify(mpResponse));

        generateToken.restore();
        requestStub.restore();
      });
    });

    it('retry() - Retry the operation from mercadopagoError with an error', function () {
      var promise;
      var callback = sinon.spy();
      var execOptions = {
        config: {
          qs: {}
        }
      };
      var mpError = new MercadopagoError('Message', 'Cause', 500, 'idempotency-id', execOptions, requestManager);
      var execError = new MercadopagoError('Error with the request', 'Time-Out', 408, 'idempotency-id', execOptions, requestManager);

      var generateToken = sinon.stub(requestManager, 'generateAccessToken', function (callbackToken) {
        return new Promise(function (resolve) {
          resolve('ACCESS_TOKEN');
          return callbackToken.apply(null, ['ACCESS_TOKEN', null]);
        });
      });

      var requestStub = sinon.stub(requestManager, 'exec', function (options, callbackExec) {
        return new Promise(function (resolve, reject) {
          reject(execError);
          return callbackExec.apply(null, [null, execError]);
        });
      });

      promise = mpError.retry(callback);

      assert.isRejected(promise);

      promise.catch(function () {
        var callbackErrror = callback.args[0][0];

        assert.instanceOf(callbackErrror, MercadopagoError);
        assert.equal(JSON.stringify(callbackErrror), JSON.stringify(execError));

        generateToken.restore();
        requestStub.restore();
      });
    });
  });
});
