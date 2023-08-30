/**
 * Mercado Pago Identification Types get.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get Documentation }.
 */
import MercadoPago, { IdentificationType } from '@src/index';

const client = new MercadoPago({ accessToken: 'access_token' });

const identificationType = new IdentificationType(client);

identificationType.get().then((result) => console.log(result));
