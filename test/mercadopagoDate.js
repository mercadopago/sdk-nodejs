/* eslint-env node, mocha */
var chai = require('chai');
var moment = require('moment');
var MercadopagoDate = require('../lib/utils/mercadopagoDate');
var assert = chai.assert;

describe('MercadopagoDate Class', function () {
  var stringOffset;

  // I'm getting the current offset, because if the test server has another TZ, this tests will crash
  before(function () {
    var currentOffset = (moment().utcOffset() / 60);

    stringOffset = (currentOffset < 0) ? '-' : '+';

    currentOffset = (currentOffset < 0) ? currentOffset * -1 : currentOffset;

    if (currentOffset < 10) stringOffset += '0';

    stringOffset += currentOffset + ':00';
  });

  describe('Constructor', function () {
    it('with no arguments', function () {
      var mpDate = new MercadopagoDate();

      assert.instanceOf(mpDate, MercadopagoDate, 'mpDate is an instance of MercadopagoDate');
    });

    it('with one argument (date)', function () {
      var mpDate = new MercadopagoDate('2016-01-01');

      assert.instanceOf(mpDate, MercadopagoDate, 'mpDate is an instance of MercadopagoDate');
    });

    it('two argument (date, fromat)', function () {
      var mpDate = new MercadopagoDate('2016-01-01', 'YYYY-MM-DD');

      assert.instanceOf(mpDate, MercadopagoDate, 'mpDate is an instance of MercadopagoDate');
    });
  });

  describe('Functions', function () {
    var mpDate;

    beforeEach(function () {
      mpDate = new MercadopagoDate('2016-01-01T18:00:00.000' + stringOffset);
    });

    it('toString without utc', function () {
      assert.equal(mpDate.toString(), '2016-01-01T18:00:00.000' + stringOffset);
    });

    it('toString with utc', function () {
      assert.equal(mpDate.toString(0).slice(-6), '+00:00');
    });

    it('toDate', function () {
      assert.instanceOf(mpDate.toDate(), Date, 'Returning a Date object');
    });

    it('add', function () {
      assert.equal(mpDate.add(1).toString(), '2016-01-02T18:00:00.000' + stringOffset);
    });

    it('subtract', function () {
      assert.equal(mpDate.subtract(1).toString(), '2015-12-31T18:00:00.000' + stringOffset);
    });
  });
});
