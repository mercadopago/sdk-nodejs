# Mercado Pago Node.js SDK documentation

Use the root README to install the SDK and send a first request. This index connects runnable TypeScript examples with the operational behavior implemented by the Node.js SDK.

## Start with Orders

Orders is the recommended learning path because it demonstrates the complete payment lifecycle. Begin with [create](../src/examples/order/create.ts), inspect the result with [get](../src/examples/order/get.ts), and continue with [process](../src/examples/order/process.ts), [capture](../src/examples/order/capture.ts), [cancel](../src/examples/order/cancel.ts), or a [total refund](../src/examples/order/refundTotal.ts).

Before production traffic, add [bounded retries and idempotency](request-options.md) and [typed error handling](error-handling.md). The [Orders-first example catalog](../src/examples/README.md#orders-first) also covers Checkout Pro, transactions, PSE, 3DS, automatic payments, and industry fields.

## Operational guides

| Question | Guide |
|---|---|
| How should timeout, retries, and idempotency be configured? | [Request options](request-options.md) |
| How should failures be classified? | [Error handling](error-handling.md) |
| How should signed notifications be processed? | [Webhook validation](webhooks.md) |
| What should be checked first during an incident? | [Troubleshooting](troubleshooting.md) |

Endpoint fields and response schemas belong to the [Mercado Pago API reference](https://www.mercadopago.com/developers/en/reference).
