/**
 * Payment Refund client for the MercadoPago API.
 *
 * Provides methods to create partial or total refunds on a payment,
 * retrieve a specific refund, and list all refunds associated with a payment.
 *
 * @module paymentRefund
 */

import get from './get';
import create from './create';
import list from './list';
import total from './total';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';
import type { PaymentRefundCreateData } from './create/types';
import type { PaymentRefundGetData } from './get/types';
import type { PaymentRefundListData } from './list/types';
import type { RefundResponse } from './commonTypes';
import type { PaymentRefundTotalData } from './total/types';

/**
 * Client facade for MercadoPago payment refund operations.
 *
 * Supports creating partial refunds (with a specified amount), total
 * refunds (full payment amount), retrieving individual refund details,
 * and listing all refunds for a given payment.
 *
 * @see {@link https://www.mercadopago.com/developers/en/reference Documentation }.
 */
export class PaymentRefund {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Retrieve a specific refund by payment ID and refund ID.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/get.ts Usage Example }.
	 */
	get({ payment_id, refund_id, requestOptions }: PaymentRefundGetData): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ payment_id, refund_id, config: this.config });
	}

	/**
	 * Create a partial refund on a payment.
	 *
	 * To refund a specific amount, include the `amount` field in the body.
	 * For a full refund, use the {@link total} method instead.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/create.ts Usage Example }.
	 */
	create({ payment_id, body, requestOptions }: PaymentRefundCreateData): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ payment_id, body, config: this.config });
	}

	/**
	 * Create a total (full-amount) refund on a payment.
	 *
	 * Refunds the entire payment amount. No request body is required.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/create.ts Usage Example }.
	 */
	total({ payment_id, requestOptions }: PaymentRefundTotalData): Promise<RefundResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return total({ payment_id, config: this.config });
	}

	/**
	 * List all refunds associated with a payment.
	 *
	 * @see {@link https://github.com/mercadopago/sdk-nodejs/blob/master/src/examples/paymentRefund/list.ts Usage Example }.
	 */
	list({ payment_id, requestOptions }: PaymentRefundListData): Promise<Array<RefundResponse>> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return list({ payment_id, config: this.config });
	}
}
