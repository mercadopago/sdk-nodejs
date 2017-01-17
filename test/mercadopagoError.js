/* eslint-env node, mocha */
var chai = require('chai');
var moment = require('moment');
var MercadopagoError = require('../lib/utils/mercadopagoError');
var assert = chai.assert;
var expect = chai.expect;

describe('MercadopagoError Class', function () {
  describe('Constructor', function () {
    it('with no arguments', function () {
      var mpError = new MercadopagoError();

      assert.instanceOf(mpError, MercadopagoError, 'mpError is an instance of MercadopagoError');
      assert.equal(mpError.name, 'MercadoPagoError');
      assert.equal(mpError.message, 'Unknown Error');
      assert.equal(mpError.status, 500);
      assert.isUndefined(mpError.idempotency);
    });

    it('with arguments', function () {
      var mpError = new MercadopagoError('Time-Out', 408, 'idempotency');

      assert.instanceOf(mpError, MercadopagoError, 'mpError is an instance of MercadopagoError');
      assert.equal(mpError.name, 'MercadoPagoError');
      assert.equal(mpError.message, 'Time-Out');
      assert.equal(mpError.status, 408);
      assert.equal(mpError.idempotency, 'idempotency');
    });
  });
});
