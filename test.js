var Promise = require('bluebird')
var MercadoPagoError = require('./lib/utils/mercadopagoError')

function test(){
  return new Promise(function(resolve, reject) {
    var asd = new MercadoPagoError('error');
    resolve('test');
  })
}

test().then(function(data){
  console.log(data)
}).catch(function(err){
  console.log(err)
})
