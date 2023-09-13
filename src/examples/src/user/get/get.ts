import MercadoPago, { User } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });
const userClient = new User(client);

userClient.get()
	.then((result) => console.log(result));
