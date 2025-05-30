import MercadoPago, { CardToken } from '@src/index';

/**
 * Mercado Pago Card Token Get.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const cardToken = new CardToken(client);

cardToken.get({
	id: '<CARD_TOKEN_ID>'
}).then(console.log).catch(console.log); 