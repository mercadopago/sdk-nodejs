var chai = require('chai'),
    moment = require('moment'),
    mercadopagoResponse = require('../lib/utils/mercadopagoResponse'),
    assert = chai.assert,
    expect = chai.expect;

describe('mercadopagoError Class', function(){
    describe('Constructor', function(){
        it('with no arguments', function(){
            var mpResponse = new mercadopagoResponse();

            assert.instanceOf(mpResponse, mercadopagoResponse, 'mpResponse is an instance of mercadopagoResponse');
            assert.isUndefined(mpResponse.body);
            assert.isUndefined(mpResponse.status);
            assert.isUndefined(mpResponse.idempotency);
        });

        it('with arguments', function(){
            var mpResponse = new mercadopagoResponse({}, 200, 'idempotency');

            assert.instanceOf(mpResponse, mercadopagoResponse, 'mpResponse is an instance of mercadopagoResponse');
            assert.equal(JSON.stringify(mpResponse.body), JSON.stringify({}));
            assert.equal(mpResponse.status, 200);
            assert.equal(mpResponse.idempotency, 'idempotency');
        });
    });
});