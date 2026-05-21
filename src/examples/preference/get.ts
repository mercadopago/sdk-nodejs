import MercadoPago, { Preference } from '@src/index';

/**
 * Mercado Pago Preference.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference/preference/_checkout_preference_id/get Documentation }.
 */

const client = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });
const preference = new Preference(client);

preference.get({ preferenceId: '<PREFERENCE_ID>' }).then(console.log).catch(console.log);

