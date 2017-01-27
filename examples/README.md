# Examples

In this folder you are going to find a server that you can run and execute integration tests.

### Installation & How to run the server

First you need to install the dependencies. There are a lot just the basic to work:

- Express
- JADE

```
$ npm install
```

Then you can run the application:

```
$ npm start
```

or

```
$ node index.js
```

This is going to run a server on the port *8080*. You can change this port on the *config.json* file.

### How it works

Once you start the server, to execute the examples you need to enter on the url as a parameter the route of the *js* file to test. Example:

On examples folder you are going to find the folder:

```
- examples
  - checkout-buttons
    - basic-preference
      - button.js
```

If you wan't to test the a basic-preferences creation for a checkout button, you need to enter on your browser the following url:

```
http://localhost:8080/checkout-buttons/basic-preference/button
```

This is going to execute the button.js on the browser.

### Creating new examples

If you wan't to make your own examples, you only need to create a folder and a JS with an example to try. For example:

If you want to create a payment i am going to create a folder called payment, and inside i will add a create.js file:

```
- payment
  - create.js
```

The content will be the following

```javascript
var mercadopago = require('../../index');

exports.run = function (req, res) {
  var payment = {
    description: 'Buying a PS4',
    transaction_amount: 10500,
    payment_method_id: 'rapipago',
    payer: {
      email: 'test_user_3931694@testuser.com',
      identification: {
        type: 'DNI',
        number: '34123123'
      }
    }
  };

  mercadopago.payment.create(payment).then(function (data) {
    res.render('jsonOutput', {
      result: data
    });
  }).catch(function (error) {
    res.render('500', {
      error: error
    });
  });
};

```

The view-engine is jade and the *jsonOutput* template is always going to show the body on the *mercadopagoResponse*.
