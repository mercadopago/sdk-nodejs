/* istanbul ignore next */
module.exports = {
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      maxLength: 32
    },
    application_fee: {
      type: 'number'
    },
    status: {
      enum: ['active', 'inactive', 'cancelled']
    },
    description: {
      type: 'string'
    },
    external_reference: {
      type: 'string',
      maxLength: 256
    },
    date_created: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    last_modified: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    auto_recurring: {
      type: 'object',
      properties: {
        frequency: {
          type: 'integer'
        },
        frequency_type: {
          enum: ['days', 'months']
        },
        transaction_amount: {
          type: 'number'
        },
        currency_id: {
          type: 'string',
          maxLength: 3
        },
        repetitions: {
          type: 'integer'
        },
        debit_date: {
          type: 'string',
          pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
        },
        free_trial: {
          type: 'object',
          properties: {
            frequency: {
              type: 'integer'
            },
            frequency_type: {
              enum: ['days', 'months']
            }
          }
        }
      }
    },
    live_mode: {
      type: 'boolean'
    },
    setup_fee: {
      type: 'number'
    },
    metadata: {
      type: 'object'
    }
  }
};
