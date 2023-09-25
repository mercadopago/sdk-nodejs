import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preferences/_checkout_preferences_search/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>' });

const preference = new Preference(client);

preference.search().then(console.log).catch(console.log);
