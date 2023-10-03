/**
 * Mercado Pago Identification Types get.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get Documentation }.
 */
import MercadoPago, { IdentificationType } from '@src/index';

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const identificationType = new IdentificationType(client);

identificationType.list().then((result) => console.log(result));
