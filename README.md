<div align="center">
  <img src="assets/mercado-pago.svg" alt="Mercado Pago" width="120" />
  <h1>Mercado Pago SDK for Node.js</h1>
  <p><strong>The official Mercado Pago SDK for Node.js applications.</strong></p>
  <p>Integrate Mercado Pago APIs into your server-side JavaScript and TypeScript applications.</p>
  <p>
    <a href="https://github.com/mercadopago/sdk-nodejs/actions/workflows/ci.yml"><img src="assets/badges/ci.svg" alt="CI workflow" /></a>
    <a href="#installation"><img src="assets/badges/package.svg" alt="npm package" /></a>
    <img src="assets/badges/runtime.svg" alt="Node.js 18 or later" />
    <a href="LICENSE"><img src="assets/badges/license.svg" alt="MIT license" /></a>
  </p>
  <p>
    <a href="#installation">Installation</a> ·
    <a href="#getting-started">Getting started</a> ·
    <a href="#documentation">Documentation</a> ·
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 💡 Requirements

The SDK Supports NodeJS version 18 or higher.

## 📲 Installation

First time using Mercado Pago? Create your [Mercado Pago account](https://www.mercadopago.com), if you don’t have one already.

1. Install NodeJS SDK for MercadoPago running in command line:

```sh
$ npm install --save mercadopago
```

2. Copy the access_token in the [credentials](https://www.mercadopago.com/developers/en/docs/your-integrations/credentials) section of the page and replace YOUR_ACCESS_TOKEN with it.

That's it! Mercado Pago SDK has been successfully installed.

## 🌟 Getting Started

Simple usage looks like:

```javascript
// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Order } from "mercadopago";

// Step 2: Initialize the client object
const client = new MercadoPagoConfig({
	accessToken: "<ACCESS_TOKEN>",
	options: { timeout: 5000 },
});

// Step 3: Initialize the API object
const order = new Order(client);

// Step 4: Create the request object
const body = {
	type: "online",
	processing_mode: "automatic",
	total_amount: "1000.00",
	external_reference: "ext_ref_1234",
	payer: {
		email: "<PAYER_EMAIL>",
	},
	transactions: {
		payments: [
			{
				amount: "1000.00",
				payment_method: {
					id: "master",
					type: "credit_card",
					token: "<CARD_TOKEN>",
					installments: 1,
					statement_descriptor: "Store name",
				},
			},
		],
	},
};

// Step 5: Create request options object - Optional
const requestOptions = {
	idempotencyKey: "<IDEMPOTENCY_KEY>",
};

// Step 6: Make the request
order.create({ body, requestOptions }).then(console.log).catch(console.error);
```

### Step 1: Import the parts of the module you want to use

Import `MercadoPagoConfig` and API objects from the MercadoPago module.

```javascript
import { MercadoPagoConfig, Order } from "mercadopago";
```

### Step 2: Initialize the client object

Initialize the client object, passing the following:

- `accessToken`: Application's private key.
- `options`: These are optional fields,
  - `timeout`: Are the timeout of requests
  - `idempotencyKey`: use one stable key when retrying the same operation. See [retries and idempotency](docs/request-options.md).

For example:

```javascript
const client = new MercadoPagoConfig({
	accessToken: "<ACCESS_TOKEN>",
	options: { timeout: 5000, idempotencyKey: "<IDEMPOTENCY_KEY>" },
});
```

### Step 3: Initialize the API object

Initialize the API object you want to use, passing the `client` object from the previous step.

```javascript
const order = new Order(client);
```

### Step 4: Create the request object

Create the request object. For example, for a request to the `/v1/orders` endpoint:

```javascript
const body = {
	type: "online",
	processing_mode: "automatic",
	total_amount: "1000.00",
	external_reference: "ext_ref_1234",
	payer: {
		email: "<PAYER_EMAIL>",
	},
	transactions: {
		payments: [
			{
				amount: "1000.00",
				payment_method: {
					id: "master",
					type: "credit_card",
					token: "<CARD_TOKEN>",
					installments: 1,
					statement_descriptor: "Store name",
				},
			},
		],
	},
};
```

### Step 5: Make the request

Use the API object's method to make the request. For example, to make a request to the `/v1/orders` endpoint using the `order` object:

```javascript
order.create({ body }).then(console.log).catch(console.error);
```

## 📚 Documentation

- [SDK guides](docs/README.md): request options, errors, webhooks, and production guidance.
- [Examples](src/examples/README.md): integration flows supported by this SDK.
- [API reference](https://www.mercadopago.com/developers/en/reference): request fields and response schemas.

## 🤝 Contributing

All contributions are welcome, ranging from people wanting to triage issues, others wanting to write documentation, to people wanting to contribute with code.

Please read and follow our [contribution guidelines](CONTRIBUTING.md). Contributions not following these guidelines will be disregarded. The guidelines are in place to make all of our lives easier and make contribution a consistent process for everyone.

### Patches to version 1.x.x

Since the release of version 2.0.0, version 1 is deprecated and will not be receiving new features, only bug fixes. If you need to submit PRs for that version, please do so by using develop-v1 as your base branch.

## ❤️ Support

If you require technical support, please contact our support team at our developers
site: [English](https://www.mercadopago.com/developers/en/support/center/contact)
/ [Portuguese](https://www.mercadopago.com/developers/pt/support/center/contact)
/ [Spanish](https://www.mercadopago.com/developers/es/support/center/contact)

## 🏻 License

```
MIT license. Copyright (c) 2024 - Mercado Pago / Mercado Libre
For more information, see the LICENSE file.
```
