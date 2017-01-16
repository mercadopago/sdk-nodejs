var chai = require('chai'),
    moment = require('moment'),
    mercadopagoIpnResponse = require('../lib/utils/mercadopagoIpnResponse'),
    assert = chai.assert,
    expect = chai.expect;

describe('mercadopagoError Class', function(){
    describe('Constructor', function(){
        it('with no arguments', function(){
            var mpIpnResponse = new mercadopagoIpnResponse();

            assert.instanceOf(mpIpnResponse, mercadopagoIpnResponse, 'mpIpnResponse is an instance of mercadopagoIpnResponse');
            assert.isUndefined(mpIpnResponse.id);
            assert.isUndefined(mpIpnResponse.topic);
            assert.isUndefined(mpIpnResponse.status);
            assert.isUndefined(mpIpnResponse.body);
        });

        it('with arguments', function(){
            var mpIpnResponse = new mercadopagoIpnResponse(1, 'payment', 200, {});

            assert.instanceOf(mpIpnResponse, mercadopagoIpnResponse, 'mpIpnResponse is an instance of mercadopagoIpnResponse');
            assert.equal(mpIpnResponse.id, 1);
            assert.equal(mpIpnResponse.topic, 'payment');
            assert.equal(JSON.stringify(mpIpnResponse.body), JSON.stringify({}));
            assert.equal(mpIpnResponse.status, 200);
        });
    });
});