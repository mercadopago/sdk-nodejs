/**
 * Mercado Pago Customer card create.
 *
 * @see {@link https://www.mercadopago.com.br/developers/en/reference/customers/_customers/post Documentation}.
*/
import { Customer } from '@src/index';
import MercadoPago from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const customerClient = new Customer(client);

const body = {
	email: 'jhon@doe.com',
	first_name: 'Jhon',
	last_name: 'Doe',
	phone: {
		area_code: '55',
		number: '991234567'
	},
	identification: {
		type: 'CPF',
		number: '12345678900'
	},
	default_address: 'Home',
	address: {
		id: '123123',
		zip_code: '01234567',
		street_name: 'Rua Exemplo',
		street_number: '123',
		city: {}
	},
	date_registered: '2021-10-20T11:37:30.000-04:00',
	description: 'Description del user',
	default_card: 'None'
};

customerClient.create({ body })
	.then((result) => console.log(result));
