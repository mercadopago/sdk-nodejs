import MercadoPago, { CardToken } from '../../../../dist';

const client = new MercadoPago({accessToken: 'access_token'})
const cardToken = new CardToken(client);

const body = {
    card_id : "9067121741",
    security_code : "123"
}

cardToken.create({cardTokenBody : body})
 .then((result) => console.log(result))