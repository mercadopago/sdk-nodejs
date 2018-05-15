/* istanbul ignore next */
module.exports = {
  additionalProperties: false,
  properties: {
    concept_type: {
      enum: ['on_platform', 'off_platform']
    },
    amount: {
      type: 'number'
    },
    description: {
      type: 'string'
    },
    currency_id: {
      enum: ['ARS', 'BRL', 'MXN', 'VEF', 'COP', 'CLP']
    },
    payer_email: {
      type: 'string',
      format: 'email'
    },
    status: {
      enum: ['pending', 'accepted', 'rejected', 'cancelled']
    },
    collector_id: {
      type: 'integer'
    },
    id: {
      type: 'integer'
    },
    init_point: {
      type: 'string'
    },
    site_id: {
      enum: ['MLA', 'MLB', 'MLM', 'MLV', 'MCO', 'MLC']
    }
  }
};
