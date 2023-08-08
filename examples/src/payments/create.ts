import MercadoPago, { Payments } from '../../../dist';

const client = new MercadoPago({accessToken: 'access_token', options: {timeout: 5000}})

const payments = new Payments(client);

payments.search().then((result) => console.log(result.results[0]))
