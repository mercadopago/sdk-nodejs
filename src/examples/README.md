# Node.js examples

These TypeScript files demonstrate integration flows implemented by the Node.js SDK. Start with Orders, then choose another API only when the payment product requires it.

## Orders first

Orders is the most complete learning path in this repository: it covers creation, retrieval, processing, capture, cancellation, refunds, and transaction management.

| Stage | Goal | Example |
|---|---|---|
| 1. Create | Submit a basic order | [`create.ts`](order/create.ts) |
| 2. Inspect | Retrieve the server-side result | [`get.ts`](order/get.ts) |
| 3. Advance | Process or capture an order | [`process.ts`](order/process.ts) · [`capture.ts`](order/capture.ts) |
| 4. Reverse | Cancel, partially refund, or fully refund | [`cancel.ts`](order/cancel.ts) · [`refundPartial.ts`](order/refundPartial.ts) · [`refundTotal.ts`](order/refundTotal.ts) |
| 5. Manage transactions | Create, update, or delete a transaction | [`transaction/create.ts`](order/transaction/create.ts) · [`transaction/update.ts`](order/transaction/update.ts) · [`transaction/delete.ts`](order/transaction/delete.ts) |
| 6. Add a payment flow | Use Checkout Pro, PSE, 3DS, or automatic payments | [`createCheckoutPro.ts`](order/createCheckoutPro.ts) · [`createPSE.ts`](order/createPSE.ts) · [`createWith3DS.ts`](order/createWith3DS.ts) · [`createWithAutomaticPayments.ts`](order/createWithAutomaticPayments.ts) |
| 7. Add specialized data | Use industry fields or handle a 3DS response | [`createWithIndustryFields.ts`](order/createWithIndustryFields.ts) · [`handle3DSResponse.ts`](order/handle3DSResponse.ts) |

Before production use, persist the idempotency key and narrow SDK errors explicitly. See [request options](../../docs/request-options.md) and [error handling](../../docs/error-handling.md).

## Other supported examples

| Goal | API | Examples |
|---|---|---|
| Create a hosted checkout | Preferences API | [`preference/`](preference/) |
| Connect a seller account | OAuth API | [`oAuth/`](oAuth/) |
| Create or manage subscriptions | Preapproval APIs | [`preApproval/`](preApproval/) · [`preApprovalPlan/`](preApprovalPlan/) |
| Create and manage payments | Payments API | [`payment/`](payment/) |
| Create and manage refunds | Refund API | [`paymentRefund/`](paymentRefund/) |
| Manage Point payment intents | Point API | [`point/`](point/) |

Run examples with the repository's TypeScript tooling, test credentials, and test data. Confirm fields in the [API reference](https://www.mercadopago.com/developers/en/reference). Never commit credentials or use production card data in examples.
