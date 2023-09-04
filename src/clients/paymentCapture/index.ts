import update from './update';
import type { MercadoPagoConfig } from '../../mercadoPagoConfig';
import type { PaymentCaptureRequest } from './update/types';
import type { PaymentsResponse } from '../payments/commonTypes';

/**
 * Mercado Pago Payment Capture.
 *
 * @see {@link https://www.mercadopago.com.br/developers/pt/docs/checkout-api/payment-management/make-value-reserve Documentation }.
 */
export class PaymentCapture {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
   * Mercado Pago Capture.
   *
   * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/src/paymentCapture/update/update.ts Usage Example  }.
   */
	update({ id, body }: PaymentCaptureRequest): Promise<PaymentsResponse> {
		body.capture = true;
		return update({ id, body, config: this.config });
	}
}
