import MercadoPago, { CardToken } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const cardToken = new CardToken(client);

cardToken.get({ cardTokenId: '<CARD_TOKEN_ID>' }).then(console.log).catch(console.log);
