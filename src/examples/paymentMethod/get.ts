import MercadoPago, { PaymentMethod } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const paymentMethod = new PaymentMethod(client);

paymentMethod.get().then(console.log).catch(console.log);
