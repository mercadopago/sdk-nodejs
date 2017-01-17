/* eslint-env node, mocha */
var chai = require('chai');
var MercadopagoIpnResponse = require('../lib/utils/mercadopagoIpnResponse');
var assert = chai.assert;

describe('mercadopagoError Class', function () {
  describe('Constructor', function () {
    it('with no arguments', function () {
      var mpIpnResponse = new MercadopagoIpnResponse();

      assert.instanceOf(mpIpnResponse, MercadopagoIpnResponse,
        'mpIpnResponse is an instance of MercadopagoIpnResponse');
      assert.isUndefined(mpIpnResponse.id);
      assert.isUndefined(mpIpnResponse.topic);
      assert.isUndefined(mpIpnResponse.status);
      assert.isUndefined(mpIpnResponse.body);
    });

    it('with arguments', function () {
      var mpIpnResponse = new MercadopagoIpnResponse(1, 'payment', 200, {});

      assert.instanceOf(mpIpnResponse, MercadopagoIpnResponse,
        'mpIpnResponse is an instance of MercadopagoIpnResponse');
      assert.equal(mpIpnResponse.id, 1);
      assert.equal(mpIpnResponse.topic, 'payment');
      assert.equal(JSON.stringify(mpIpnResponse.body), JSON.stringify({}));
      assert.equal(mpIpnResponse.status, 200);
    });
  });
});
