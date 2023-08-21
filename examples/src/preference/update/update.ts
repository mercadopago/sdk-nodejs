import MercadoPago, { Preference } from '../../../../dist';
import { UpdatePreferenceNovo } from './types';
require('dotenv').config();

const client = new MercadoPago({accessToken: process.env.ACCESS_TOKEN, options: {timeout: 5000}})

const preference = new Preference(client);

const preferenceRequest: UpdatePreferenceNovo = {
  id: process.env.ID,
  updatePreferenceRequest: {
  additional_info: "teste update",
  expires: false,
    items: [
      {
          id: "1234",
          title: "Dummy Title",
          description: "Dummy update",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "car_electronics",
          quantity: 2,
          currency_id: "$",
          unit_price: 20
      }
    ],
  }
};

preference.update(preferenceRequest)
.then((result) => console.log(result))
