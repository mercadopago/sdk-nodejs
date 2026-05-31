import MercadoPagoConfig, { Chargeback } from '../../index';

const client = new MercadoPagoConfig({ accessToken: '<YOUR_ACCESS_TOKEN>' });
const chargeback = new Chargeback(client);

chargeback.get({ id: '<CHARGEBACK_ID>' }).then(console.log).catch(console.error);

chargeback.search({ options: { payment_id: 19951521071, limit: 10 } }).then(console.log).catch(console.error);
