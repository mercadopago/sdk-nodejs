var config = require('./config');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mercadopago = require('../index');

// Create Express Application
var app = express();

// Add Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Set Jade as View Engine
app.set('view engine', 'jade');

// Iniialize mercadopago SDK
mercadopago.configure({
  client_id: config.client_id,
  client_secret: config.client_secret
});

app.get(/\/(.+)/, function (req, res) {
  var fileFromParameter = req.params[0] + '.js';

  if (fs.existsSync(fileFromParameter)) {
    // Execute the file found
    require('./' + fileFromParameter).run(req, res);
  } else {
    // Return 404
    res.status(404).render('404', {
      file: fileFromParameter
    });
  }
});

// Start Express Application
app.listen(config.port);

console.log('Server running on port:', config.port);
