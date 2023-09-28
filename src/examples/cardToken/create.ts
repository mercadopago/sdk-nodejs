import MercadoPago, { CardToken } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const cardToken = new CardToken(client);

const body = {
	card_id : '<CARD_ID>',
	security_code : '<SECURITY_CODE>'
};

cardToken.create({ body }).then(console.log).catch(console.log);
