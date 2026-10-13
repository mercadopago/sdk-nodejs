# Handle API and connection errors

Catch the most specific exported error on which the application can act:

```ts
try {
  const result = await order.create({ body, requestOptions });
} catch (error) {
  if (error instanceof MPRateLimitError) {
    console.error('Retry after:', error.retryAfter);
  } else if (error instanceof MPConnectionError) {
    console.error('No API response was received');
  } else if (error instanceof MercadoPagoError) {
    console.error(error.status, error.error, error.causes);
  } else {
    throw error;
  }
}
```

Use the error category to choose recovery:

| Category | Application decision |
|---|---|
| Authentication or forbidden | Stop; correct credentials or permissions. |
| Bad request or validation | Correct the input; an identical retry will fail. |
| Idempotency | Preserve the original key and reconcile that operation. |
| Rate limit | Respect `retryAfter` when available and reduce concurrency. |
| Dependency, locked resource, or server | Retry only within a bounded policy. |
| `MPConnectionError` | The outcome is unknown; reconcile before repeating a write. |

At the application boundary, unknown thrown values are not guaranteed to be `Error`, so narrow them before reading properties. Log the SDK error type, status, operation, request ID when available, and your correlation ID. Never log access tokens, card data, full bodies, or complete API responses.
