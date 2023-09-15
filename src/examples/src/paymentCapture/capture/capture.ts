import MercadoPago, { PaymentCapture } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const payment = new PaymentCapture(client);

payment.capture({
	id: 'id',
	body: {
		transaction_amount: 75
	}
}).then((result) => console.log(result))
	.catch((error) => console.log(error));

