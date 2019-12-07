/* istanbul ignore next */
module.exports = {
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      maxLength: 256
    },
    plan_id: {
      type: 'string',
      maxLength: 32
    },
    payer: {
      type: 'object'
    },
    application_fee: {
      type: 'number'
    },
    status: {
      enum: ['pending', 'active', 'paused', 'cancelled']
    },
    description: {
      type: 'string',
      maxLength: 256
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
    live_mode: {
      type: 'boolean'
    },
    start_date: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    end_date: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    metadata: {
      type: 'object'
    },
    charges_detail: {
      type: 'object'
    },
    setup_fee: {
      type: 'number'
    }
  }
};
