import MercadoPago, { Preference } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });
const preference = new Preference(client);

preference.get({ preferenceId: 'id' })
	.then((result) => console.log(result))
	.catch((error) => console.log(error));

