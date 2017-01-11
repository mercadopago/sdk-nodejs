var chai = require('chai'),
    moment = require('moment'),
    mercadopagoDate = require('../lib/utils/mercadopagoDate'),
    assert = chai.assert,
    expect = chai.expect;

describe('mercadopagoDate Class', function(){
    describe('Constructor', function(){
        it('with no arguments', function(){
            var mpDate = new mercadopagoDate();

            assert.instanceOf(mpDate, mercadopagoDate, 'mpDate is an instance of mercadopagoDate');
        });

        it('with one argument (date)', function(){
            var mpDate = new mercadopagoDate('2016-01-01');

            assert.instanceOf(mpDate, mercadopagoDate, 'mpDate is an instance of mercadopagoDate');
        });

        it('two argument (date, fromat)', function(){
            var mpDate = new mercadopagoDate('2016-01-01', 'YYYY-MM-DD');

            assert.instanceOf(mpDate, mercadopagoDate, 'mpDate is an instance of mercadopagoDate');
        });
    });

    describe('Functions', function(){
        var mpDate;

        beforeEach(function(){
            mpDate = new mercadopagoDate('2016-01-01T18:00:00.000-03:00');
        });

        it('toString without utc', function(){
            assert.equal(mpDate.toString(), '2016-01-01T18:00:00.000-03:00');
        });

        it('toString with utc', function(){
            assert.equal(mpDate.toString(0), '2016-01-01T21:00:00.000+00:00');
        });

        it('toDate', function(){
            assert.instanceOf(mpDate.toDate(), Date, 'Returning a Date object');
        });

        it('add', function(){
            assert.equal(mpDate.add(1).toString(), '2016-01-02T18:00:00.000-03:00');
        });

        it('subtract', function(){
            assert.equal(mpDate.subtract(1).toString(), '2015-12-31T18:00:00.000-03:00');
        });
    });
});