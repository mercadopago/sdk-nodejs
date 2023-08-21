import MercadoPago, { Preference } from '../../../../dist';
import { PreferenceSearchOptions } from './types';
require('dotenv').config();

const client = new MercadoPago({accessToken: process.env.ACCESS_TOKEN, options: {timeout: 9000}})

const preference = new Preference(client);

const preferenceSearch: PreferenceSearchOptions = {
  sponsor_id: '0',
  external_reference: '',
  site_id: 'MLA',
  marketplace: 'NONE'
};

preference.search(preferenceSearch)
.then((result) => console.log(result))
