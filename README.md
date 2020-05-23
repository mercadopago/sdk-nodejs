# Mercado Pago SDK for NodeJS

[![License](https://img.shields.io/apm/l/vim-mode)](https://github.com/mercadopago/dx-nodejs)
[![NPM Version](https://img.shields.io/npm/v/mercadopago.svg)](http://npmjs.com/package/mercadopago)
[![Downloads](https://img.shields.io/npm/dt/mercadopago.svg)](http://npmjs.com/package/mercadopago)
 
This library provides developers with a simple set of bindings to help you integrate Mercado Pago API to a website and start receiving payments.

## 💡 Requirements

The SDK Supports Node.js from version v0 to the latest (v7).

## 📲 Installation 

First time using Mercado Pago? Create your [Mercado Pago account](https://www.mercadopago.com), if you don’t have one already.

1. Run
```sh
$ npm install --save mercadopago
```

2. Copy the access_token in the [credentials](https://www.mercadopago.com/mlb/account/credentials) section of the page and replace YOUR_ACCESS_TOKEN with it.

Thats all, you have Mercado Pago SDK installed.

## 🌟 Getting Started

  Simple usage looks like:

```javascript
var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'ACCESS_TOKEN'
});
```

## 📚 Documentation 

See our Documentation with all APIs you can integrate in our DevSite: [Spanish](https://www.mercadopago.com.ar/developers/es/guides/payments/api/introduction/) / [Portuguese](https://www.mercadopago.com.br/developers/pt/guides/payments/api/introduction/)

Check our official code reference to explore all available functionalities.

## ❤️ Support 

If you require technical support, please contact our support team at [developers.mercadopago.com](https://developers.mercadopago.com)

## 🏻 License 

```
MIT license. Copyright (c) 2018 - Mercado Pago / Mercado Libre 
For more information, see the LICENSE file.
```
