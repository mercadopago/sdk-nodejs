var requestManager = require('../request-manager');
var discountCampaignModel = require('../models/discountCampaignModel');

var discountCampaign = module.exports = {
  schema: discountCampaignModel
};

discountCampaign.get = requestManager.describe({
  path: '/v1/discount_campaigns',
  method: 'GET'
});
