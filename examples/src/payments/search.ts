import MercadoPago, { Payments } from '../../../dist';

const client = new MercadoPago({accessToken: ''})

const payments = new Payments(client);

payments.search({
    criteria: 'asc'
}).then((result) => console.log(result.results[0]))
