[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat)](https://github.com/mercadopago/px-ios)
[![Build Status](https://travis-ci.org/mercadopago/px-nodejs.svg?branch=master)](https://travis-ci.org/mercadopago/px-nodejs)
[![Coverage Status](https://coveralls.io/repos/github/mercadopago/px-nodejs/badge.svg?branch=master)](https://coveralls.io/github/mercadopago/px-nodejs?branch=master)

# MercadoPago Node.js SDK

This library provides developers with a simple set of bindings to the MercadoPago API. You can read the full [documentation here](https://github.com/mercadopago/px-nodejs/wiki).

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

> We highly recomend using only the access_token. If you provide the client_id and client_secret it's going to generate the access_token anyway (only on Production, for Sandbox use access_token).

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
* [Customers & Cards](https://github.com/mercadopago/px-nodejs/wiki/Customers-&-Cards)
* [Merchant Orders](https://github.com/mercadopago/px-nodejs/wiki/Merchant-Orders)
* [Money Requests](https://github.com/mercadopago/px-nodejs/wiki/Money-Requests)
* [MercadoPago Connect](https://github.com/mercadopago/px-nodejs/wiki/MercadoPago-Connect)
* [IPN Notifications](https://github.com/mercadopago/px-nodejs/wiki/IPN-Notifications)

### Testing

This project is tested using:

- Mocha
- Chai
- Sinon

You can see the current covertura [here](https://coveralls.io/github/mercadopago/px-nodejs?branch=develop).

### Links
* [Documentation](https://github.com/mercadopago/px-nodejs/wiki)
* [API Documentation](developers.mercadopago.com)

### License

Copyright © 2017.
