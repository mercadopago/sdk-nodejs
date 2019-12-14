/* istanbul ignore next */
module.exports = {
  additionalProperties: false,
  properties: {
    id: {
      type: 'integer'
    },
    preapproval_id: {
      type: 'string'
    },
    type: {
      enum: ['online', 'scheduled']
    },
    status: {
      enum: ['scheduled', 'recycling', 'processed', 'cancelled']
    },
    date_created: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    last_modified: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    transaction_amount: {
      type: 'number'
    },
    currency_id: {
      type: 'string'
    },
    reason: {
      type: 'string'
    },
    external_reference: {
      type: 'string'
    },
    payment: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        },
        status: {
          type: 'string'
        },
        status_detail: {
          type: 'string'
        }
      }
    },
    rejection_code: {
      type: 'string'
    },
    retry_attempt: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    next_retry_date: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    last_retry_date: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    expire_date: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    debit_date: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    coupon_code: {
      type: 'string'
    }
  }
};
