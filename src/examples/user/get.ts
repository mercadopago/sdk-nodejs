import MercadoPago, { User } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });
const userClient = new User(client);

userClient.get()
	.then((result) => console.log(result));
