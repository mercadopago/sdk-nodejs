/* istanbul ignore next */
module.exports = {
  additionalProperties: false,
  properties: {
    preference_id: {
      type: 'string'
    },
    application_id: {
      type: 'string'
    },
    site_id: {
      type: 'string'
    },
    payer: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        email: {
          type: 'string',
          maxLength: 256
        },
        nickname: {
          type: 'string',
          maxLength: 256
        }
      }
    },
    collector: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        },
        email: {
          type: 'string',
          maxLength: 256
        },
        nickname: {
          type: 'string',
          maxLength: 256
        }
      }
    },
    sponsor_id: {
      type: 'integer'
    },
    cancelled: {
      type: 'boolean'
    },
    shipments: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        },
        shipment_type: {
          type: 'string'
        },
        shipping_mode: {
          type: 'string'
        },
        picking_type: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
        substatus: {
          type: 'string'
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string'
              },
              category_id: {
                type: 'string'
              },
              currency_id: {
                type: 'string',
                maxLength: 3
              },
              description: {
                type: 'string'
              },
              picture_url: {
                type: 'string'
              },
              quantity: {
                type: 'integer'
              },
              unit_price: {
                type: 'number'
              },
              title: {
                type: 'string'
              }
            }
          }
        },
        date_created: {
          type: 'string',
          pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
        },
        last_modified: {
          type: 'string',
          pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
        },
        date_first_printed: {
          type: 'string',
          pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
        },
        service_id: {
          type: 'string'
        },
        sender_id: {
          type: 'integer'
        },
        receiver_id: {
          type: 'integer'
        },
        receiver_address: {
          type: 'object',
          properties: {
            zip_code: {
              type: 'string',
              maxLength: 256
            },
            street_name: {
              type: 'string',
              maxLength: 256
            },
            street_number: {
              type: 'integer'
            },
            floor: {
              type: 'string',
              maxLength: 256
            },
            apartment: {
              type: 'string',
              maxLength: 256
            }
          }
        }
      }
    },
    notification_url: {
      type: 'string',
      maxLength: 500
    },
    additional_info: {
      type: 'string',
      maxLength: 600
    },
    external_reference: {
      type: 'string',
      maxLength: 256
    },
    marketplace: {
      type: 'string',
      maxLength: 256
    }
  }
};
