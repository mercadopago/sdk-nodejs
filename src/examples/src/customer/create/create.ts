/**
 * Mercado Pago Customer card create.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/reference/customers/_customers/post Documentation}.
*/
import MercadoPago, { CustomerCard } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new CustomerCard(client);

const body = {
	token : 'token',
};

customerClient.create({ customerId: 'customer_id', customerCardBody : body })
	.then((result) => console.log(result));
