import MercadoPago, { CardToken } from '../../../../dist';

const client = new MercadoPago({ accessToken: 'accessToken' });

const cardToken = new CardToken(client);

cardToken.get({ cardTokenId: 'id' })
	.then((result) => console.log(result));
