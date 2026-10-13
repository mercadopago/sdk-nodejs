# Security policy

## Report a vulnerability

Open an [issue in this repository](https://github.com/mercadopago/sdk-nodejs/issues/new/choose) with the affected SDK version, impact, and a minimal reproduction.

Do not include credentials, tokens, signatures, personal data, complete API responses, or exploit details in a public issue. If the report requires sensitive information, provide only a non-sensitive summary and ask the maintainers for a private disclosure channel.

## Credential safety

- Keep access tokens and webhook secrets in a secret manager or environment variable.
- Use private credentials only in server-side code.
- Validate signed webhook notifications before processing them.
- Rotate any credential that was committed or logged.
