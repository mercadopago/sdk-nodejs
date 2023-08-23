import MercadoPago, { Preference } from '@src/index';
import { PreferenceSearchOptions } from './types';

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 9000 } });

const preference = new Preference(client);

const preferenceSearch: PreferenceSearchOptions = {
	sponsor_id: '0',
	external_reference: '',
	site_id: 'MLA',
	marketplace: 'NONE'
};

preference.search(preferenceSearch)
	.then((result) => console.log(result))
	.catch((error) => console.log(error));
