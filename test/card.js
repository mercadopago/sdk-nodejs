/* eslint-env node, mocha */
var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var expect = chai.expect;
var cardModule = require('../lib/resources/card.js');

describe('Card Resource', function () {

  it('Check card update without card id', function () {
     
    return cardModule.update(undefined, {customer_id: "123"}, undefined).catch(error => {
        expect(error.message).to.equal("The JSON is missing the following properties: id")
    });
   
  });

  it('Check card update without customer id', function () {
     
    return cardModule.update(undefined, {id: "123"}, undefined).catch(error => {
        expect(error.message).to.equal("The JSON is missing the following properties: customer_id")
    });
   
  });

});
