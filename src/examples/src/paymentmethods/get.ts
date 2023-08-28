import MercadoPago, { PaymentMethod } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });

const paymentMethod = new PaymentMethod(client);

paymentMethod.get().then((result) => console.log(result));
