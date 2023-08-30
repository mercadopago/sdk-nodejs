import MercadoPago, { CardToken } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const cardToken = new CardToken(client);

const body = {
	card_id : 'card_id',
	security_code : 'security_code'
};

cardToken.create({ cardTokenBody : body })
	.then((result) => console.log(result));
