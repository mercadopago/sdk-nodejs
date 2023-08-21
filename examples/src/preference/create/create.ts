import MercadoPago, { Preference } from '../../../../dist';
require('dotenv').config();

const client = new MercadoPago({accessToken: process.env.ACCESS_TOKEN, options: {timeout: 5000}})

const preference = new Preference(client);

const preferenceRequest = {
  items: [
    {
        id: "1234",
        title: "Dummy Title",
        description: "Dummy description",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "car_electronics",
        quantity: 1,
        currency_id: "$",
        unit_price: 10
    }
  ],
};


preference.create(preferenceRequest)
.then((result) => console.log(result))
