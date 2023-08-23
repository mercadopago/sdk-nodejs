import MercadoPago, { Preference } from '@src/index';
import { UpdatePreferenceRequest } from './types';

const client = new MercadoPago({ accessToken: 'access_token', options: { timeout: 5000 } });

const preference = new Preference(client);

const preferenceRequest: UpdatePreferenceRequest = {
	id: 'id',
	updatePreferenceRequest: {
		additional_info: 'teste update',
		expires: false,
		items: [
			{
				id: '1234',
				title: 'Dummy Title',
				description: 'Dummy update',
				picture_url: 'http://www.myapp.com/myimage.jpg',
				category_id: 'car_electronics',
				quantity: 2,
				currency_id: '$',
				unit_price: 20
			}
		],
	}
};

preference.update(preferenceRequest)
	.then((result) => console.log(result))
	.catch((error) => console.log(error));

