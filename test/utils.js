/* eslint-env node, mocha */
var chai = require('chai');
var moment = require('moment');
var MercadopagoDate = require('../lib/utils/mercadopagoDate');
var assert = chai.assert;
var mp = require('../index.js');

describe('Utils Module', function () {
  var stringOffset;

  // I'm getting the current offset, because if the test server has another TZ, this tests will crash
  before(function () {
    var currentOffset = (moment().utcOffset() / 60);

    stringOffset = (currentOffset < 0) ? '-' : '+';

    currentOffset = (currentOffset < 0) ? currentOffset * -1 : currentOffset;

    if (currentOffset < 10) stringOffset += '0';

    stringOffset += currentOffset + ':00';
  });

  describe('Date Util', function () {
    it('Get now()', function () {
      var now = mp.utils.date.now();

      assert.instanceOf(now, MercadopagoDate, 'Now is a mercadopagoDate instance');
    });

    describe('From Method', function () {
      it('Not specified date', function () {
        assert.throws(mp.utils.date.from, 'You need to specified a date');
      });

      it('Invalid Date Format (string)', function () {
        assert.throws(mp.utils.date.from.bind(mp.utils, '2016/01/01'), 'Invalid date sent');
      });

      it('Invalid Date Format (empty object)', function () {
        assert.throws(mp.utils.date.from.bind(mp.utils, {}), 'Invalid date sent');
      });

      it('Valid date with Date Object', function () {
        var validDate = mp.utils.date.from(new Date());

        assert.instanceOf(validDate, MercadopagoDate, 'validDate is a mercadopagoDate instance');
      });

      it('Valid date with only date string', function () {
        var validDate = mp.utils.date.from('2016-01-01');

        assert.instanceOf(validDate, MercadopagoDate, 'validDate is a mercadopagoDate instance');
        assert.equal(validDate.toString(), '2016-01-01T00:00:00.000' + stringOffset);

        validDate = mp.utils.date.from('2016-10-24');

        assert.instanceOf(validDate, MercadopagoDate, 'validDate is a mercadopagoDate instance');
        assert.equal(validDate.toString(), '2016-10-24T00:00:00.000' + stringOffset);
      });

      it('Valid date with date time string', function () {
        var validDate = mp.utils.date.from('2016-01-01T18:10:15');

        assert.instanceOf(validDate, MercadopagoDate, 'validDate is a mercadopagoDate instance');
        assert.equal(validDate.toString(), '2016-01-01T18:10:15.000' + stringOffset);
      });

      it('Valid date ISO 8601 String', function () {
        var validDate = mp.utils.date.from('2016-01-01T18:00:00.000' + stringOffset);

        assert.instanceOf(validDate, MercadopagoDate, 'validDate is a mercadopagoDate instance');
        assert.equal(validDate.toString(), '2016-01-01T18:00:00.000' + stringOffset);
      });
    });
  });
});
