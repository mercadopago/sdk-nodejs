# MercadoPago Node.js SDK

This library provides developers with a simple set of bindings to the MercadoPago API. You read the full [documentation here](https://github.com/mercadopago/px-nodejs/wiki).

### Node.js Versions Support

The SDK Supports Node.js from version v0 to latest (v7).

### Installation

```
$ npm install mercadopago
```

or saving your dependency on your package.json

```
$ npm install --save mercadopago
```

### Credentials

Before you use the SDK, you need to get your credentials from the following address:

* Argentina: [https://www.mercadopago.com/mla/account/credentials](https://www.mercadopago.com/mla/account/credentials)
* Brazil: [https://www.mercadopago.com/mlb/account/credentials](https://www.mercadopago.com/mlb/account/credentials)
* Mexico: [https://www.mercadopago.com/mlm/account/credentials](https://www.mercadopago.com/mlm/account/credentials)
* Venezuela: [https://www.mercadopago.com/mlv/account/credentials](https://www.mercadopago.com/mlv/account/credentials)
* Colombia: [https://www.mercadopago.com/mco/account/credentials](https://www.mercadopago.com/mco/account/credentials)

> We highly recomend using only the access_token. If you provide the client_id and client_secret it's going to generate the access_token anyway.

### Quick Start

First you need to require the library

```javascript
var mercadopago = require('mercadopago');
```

Then you need to configure it with your credentials:

```javascript
mercadopago.configure({
    access_token: 'ACCESS_TOKEN'
});
```

You **don't need to instantiate** mercadopago. It's a global singleton accross your application. Just require the sdk in any other file and it's already configure with your credentials.

## Operations & Resources

* [Payment](https://github.com/mercadopago/px-nodejs/wiki/Payment)
* [Preferences](https://github.com/mercadopago/px-nodejs/wiki/Preferences)
* [Pre Approval](https://github.com/mercadopago/px-nodejs/wiki/Pre-Approval)
* [Customers](https://github.com/mercadopago/px-nodejs/wiki/Customers)
* [Merchant Orders](https://github.com/mercadopago/px-nodejs/wiki/Merchant-Orders)
* [Money Requests](https://github.com/mercadopago/px-nodejs/wiki/Money-Requests)
* [MercadoPago Connect](https://github.com/mercadopago/px-nodejs/wiki/MercadoPago-Connect)
* [IPN Manager](https://github.com/mercadopago/px-nodejs/wiki/IPN-Notifications)

### Testing

This project is tested using:

- Mocha
- Chai
- Sinon

You can see the current covertura [here](https://coveralls.io/github/mercadopago/px-nodejs?branch=master).

### Links
* [Documentation](https://github.com/mercadopago/px-nodejs/wiki)
* [API Documentation](developers.mercadopago.com)

### License

Copyright © 2017.
