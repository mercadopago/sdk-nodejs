import MercadoPago, { User } from '@src/index';

const client = new MercadoPago({ accessToken: 'token' });
const userClient = new User(client);

userClient.get()
	.then((result) => console.log(result));
