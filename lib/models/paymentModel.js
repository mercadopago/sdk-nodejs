/* istanbul ignore next */
module.exports = {
  additionalProperties: true, // Fails if an extra param is added to the model
  properties: {
    payer: {
      type: 'object',
      properties: {
        entity_type: {
          enum: ['individual', 'association']
        },
        type: {
          enum: ['customer', 'registered', 'guest']
        },
        id: {
          type: 'string'
        },
        email: {
          type: 'string',
          format: 'email'
        },
        identification: {
          type: 'object',
          properties: {
            type: {
              type: 'string'
            },
            number: {
              type: 'string'
            }
          }
        },
        phone: {
          type: 'object',
          properties: {
            area_code: {
              type: 'string'
            },
            number: {
              type: 'string'
            },
            extension: {
              type: 'string'
            }
          }
        },
        first_name: {
          type: 'string'
        },
        last_name: {
          type: 'string'
        }
      }
    },
    binary_mode: {
      type: 'boolean'
    },
    order: {
      type: 'object',
      properties: {
        type: {
          enum: ['mercadolibre', 'mercadopago']
        },
        id: {
          type: 'number'
        }
      }
    },
    external_reference: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    metadata: {
      type: 'object'
    },
    transaction_amount: {
      type: 'number'
    },
    coupon_amount: {
      type: 'number'
    },
    campaign_id: {
      type: 'integer'
    },
    coupon_code: {
      type: 'string'
    },
    differential_pricing_id: {
      type: 'integer'
    },
    application_fee: {
      type: 'number'
    },
    capture: {
      type: 'boolean'
    },
    payment_method_id: {
      type: 'string'
    },
    issuer_id: {
      type: 'string'
    },
    token: {
      type: 'string'
    },
    statement_descriptor: {
      type: 'string'
    },
    installments: {
      type: 'integer'
    },
    notification_url: {
      type: 'string'
    },
    callback_url: {
      type: 'string'
    },
    additional_info: {
      type: 'object',
      properties: {
        ip_address: {
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
              title: {
                type: 'string'
              },
              description: {
                type: 'string'
              },
              picture_url: {
                type: 'string'
              },
              category_id: {
                type: 'string'
              },
              quantity: {
                type: 'integer'
              },
              unit_price: {
                type: 'number'
              }
            }
          }
        },
        payer: {
          type: 'object',
          properties: {
            first_name: {
              type: 'string'
            },
            last_name: {
              type: 'string'
            },
            phone: {
              type: 'object',
              properties: {
                area_code: {
                  type: 'string'
                },
                number: {
                  type: 'string'
                }
              }
            },
            address: {
              type: 'object',
              properties: {
                zip_code: {
                  type: 'string'
                },
                street_name: {
                  type: 'string'
                },
                street_number: {
                  type: 'integer'
                }
              }
            },
            registration_date: {
              type: 'string',
              pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}-[0-9]{2}:[0-9]{2}$'
            }
          }
        },


        shipments: {
          type: 'object',
          properties: {


            receiver_address: {
              type: 'object',
              properties: {
                zip_code: {
                  type: 'string'
                },
                street_name: {
                  type: 'string'
                },
                street_number: {
                  type: 'integer'
                },
                floor: {
                  type: 'number'
                },
                apartment: {
                  type: 'string'
                }
              }
            }
          }
        }


      }
    },
    transaction_details: {
      type: 'object',
      properties:{
        acquirer_reference: {
          type: 'string'
        },
        bank_transfer_id: {
          type: 'integer'
        },
        external_resource_url: {
          type: 'string'
        },
        financial_institution: {
          type: 'string'
        },
        installment_amount: {
          type: 'number'
        },
        net_received_amount: {
          type: 'number'
        },
        overpaid_amount: {
          type: 'number'
        },
        payable_deferral_period: {
          type: 'string'
        },
        payment_method_reference_id: {
          type: 'string'
        },
        total_paid_amount: {
          type: 'number'
        },
        transaction_cicle: {
          type: 'string'
        }
      }
    }
  }
};
