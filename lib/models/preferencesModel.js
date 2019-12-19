/* istanbul ignore next */
module.exports = {
  additionalProperties: false,
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            maxLength: 256
          },
          description: {
            type: 'string',
            maxLength: 256
          },
          picture_url: {
            type: 'string',
            maxLength: 600
          },
          category_id: {
            type: 'string',
            maxLength: 256
          },
          quantity: {
            type: 'integer'
          },
          currency_id: {
            type: 'string',
            maxLength: 3
          },
          unit_price: {
            type: 'number'
          }
        }
      }
    },
    tracks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            maxLength: 256
          },
          values: {
            type: 'object',
            properties: {
              conversion_id: {
                type: 'string',
              },
              conversion_label: {
                type: 'string',
              },
              pixel_id: {
                type: 'string',
              }
            }
          }
        }
      }
    },
    metadata: {
      type: 'object',
    },
    payer: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          maxLength: 256
        },
        surname: {
          type: 'string',
          maxLength: 256
        },
        email: {
          type: 'string',
          format: 'email',
          maxLength: 256
        },
        phone: {
          type: 'object',
          properties: {
            area_code: {
              type: 'string',
              maxLength: 256
            },
            number: {
              type: 'number',
              maxLength: 256
            }
          }
        },
        identification: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              maxLength: 256
            },
            number: {
              type: 'string',
              maxLength: 256
            }
          }
        },
        address: {
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
            }
          }
        }
      }
    },
    payment_methods: {
      type: 'object',
      properties: {
        excluded_payment_methods: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                maxLength: 256
              }
            }
          }
        },
        excluded_payment_types: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                maxLength: 256
              }
            }
          }
        },
        default_payment_method_id: {
          type: 'string'
        },
        installments: {
          type: 'integer'
        },
        default_installments: {
          type: 'integer'
        }
      }
    },
    shipments: {
      type: 'object',
      properties: {
        mode: {
          enum: ['custom', 'me2', 'not_specified']
        },
        local_pickup: {
          type: 'boolean'
        },
        dimensions: {
          type: 'string'
        },
        default_shipping_method: {
          type: 'integer'
        },
        free_methods: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'integer'
              }
            }
          }
        },
        cost: {
          type: 'number'
        },
        free_shipping: {
          type: 'boolean'
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
    back_urls: {
      type: 'object',
      properties: {
        success: {
          type: 'string',
          maxLength: 600
        },
        pending: {
          type: 'string',
          maxLength: 600
        },
        failure: {
          type: 'string',
          maxLength: 600
        }
      }
    },
    notification_url: {
      type: 'string',
      maxLength: 500
    },
    mode: {
      enum: ['regular_payment', 'money_transfer']
    },
    additional_info: {
      type: 'string',
      maxLength: 600
    },
    auto_return: {
      enum: ['approved', 'all']
    },
    external_reference: {
      type: 'string',
      maxLength: 256
    },
    expires: {
      type: 'boolean'
    },
    expiration_date_from: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    expiration_date_to: {
      type: 'string',
      pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
    },
    collector_id: {
      type: 'integer'
    },
    client_id: {
      type: 'integer'
    },
    marketplace: {
      type: 'string',
      maxLength: 256
    },
    marketplace_fee: {
      type: 'number'
    },
    differential_pricing: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        }
      }
    },
    taxes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            enum: ['IVA', 'INC']
          },
          value: {
            type: 'number'
          }
        }
      }
    }
  }
};
