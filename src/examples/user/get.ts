import MercadoPago, { User } from '@src/index';

const client = new MercadoPago({ accessToken: 'APP_USR-4679935697572392-071411-ed200b57e5c38354adc3f4f6156c2f82-1273205088' });
const userClient = new User(client);

userClient.get()
	.then((result) => console.log(result));
