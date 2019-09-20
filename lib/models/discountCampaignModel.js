/* istanbul ignore next */
module.exports = {
  additionalProperties: false, // Fails if an extra param is added to the model
  properties: {
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    percent_off: {
      type: 'number'
    },
    amount_off: {
      type: 'number'
    },
    coupon_amount: {
      type: 'number'
    },
    currency_id: {
      type: 'string'
    }
  }
};
