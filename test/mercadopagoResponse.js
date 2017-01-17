/* eslint-env node, mocha */
var chai = require('chai');
var MercadopagoResponse = require('../lib/utils/mercadopagoResponse');
var assert = chai.assert;

describe('mercadopagoError Class', function () {
  describe('Constructor', function () {
    it('with no arguments', function () {
      var mpResponse = new MercadopagoResponse();

      assert.instanceOf(mpResponse, MercadopagoResponse, 'mpResponse is an instance of MercadopagoResponse');
      assert.isUndefined(mpResponse.body);
      assert.isUndefined(mpResponse.status);
      assert.isUndefined(mpResponse.idempotency);
    });

    it('with arguments', function () {
      var mpResponse = new MercadopagoResponse({}, 200, 'idempotency');

      assert.instanceOf(mpResponse, MercadopagoResponse, 'mpResponse is an instance of MercadopagoResponse');
      assert.equal(JSON.stringify(mpResponse.body), JSON.stringify({}));
      assert.equal(mpResponse.status, 200);
      assert.equal(mpResponse.idempotency, 'idempotency');
    });
  });
});
