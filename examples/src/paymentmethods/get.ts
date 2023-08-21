import MercadoPago, { PaymentMethod } from '../../../dist';

const client = new MercadoPago({ accessToken: 'token' });

const paymentMethod = new PaymentMethod(client);

paymentMethod.get().then((result) => console.log(result));
