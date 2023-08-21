import MercadoPago, { Preference } from '../../../../dist';
require('dotenv').config();

const client = new MercadoPago({accessToken: process.env.ACCESS_TOKEN, options: {timeout: 5000}})

const preference = new Preference(client);

preference.get({preferenceId: process.env.ID})
.then((result) => console.log(result))
