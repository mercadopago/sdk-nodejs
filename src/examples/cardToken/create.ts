import MercadoPago, { CardToken } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const cardToken = new CardToken(client);

cardToken.create({
	body: {
		card_number: '<CARD_NUMBER>',
		security_code: '<SECURITY_CODE>',
		expiration_month: '<EXPIRATION_MONTH>',
		expiration_year: '<EXPIRATION_YEAR>',
	}
}).then(console.log).catch(console.log);
