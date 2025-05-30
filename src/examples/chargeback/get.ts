import MercadoPago, { Chargeback } from '@src/index';

/**
 * Mercado Pago Chargeback.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/chargebacks/_chargebacks_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const chargeback = new Chargeback(client);

chargeback.get({
	id: '<CHARGEBACK_ID>'
}).then(console.log).catch(console.log); 