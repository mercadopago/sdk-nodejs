/**
 * AdvancedPayment (marketplace split-payments) client for the MercadoPago API.
 *
 * Enables marketplace integrations to collect a single payment and distribute
 * the funds among multiple sellers (disbursements). Supports two-step flows
 * (authorise → capture) and individual disbursement release-date control.
 *
 * @module advancedPayment
 */
import create from './create';
import get from './get';
import search from './search';
import update from './update';
import cancel from './cancel';
import capture from './capture';
import updateReleaseDate from './updateReleaseDate';

import type { AdvancedPaymentResponse } from './commonTypes';
import type { AdvancedPaymentCreateData } from './create/types';
import type { AdvancedPaymentGetData } from './get/types';
import type { AdvancedPaymentSearchData, AdvancedPaymentSearchResponse } from './search/types';
import type { AdvancedPaymentUpdateData } from './update/types';
import type { AdvancedPaymentCancelData } from './cancel/types';
import type { AdvancedPaymentCaptureData } from './capture/types';
import type { AdvancedPaymentUpdateReleaseDateData } from './updateReleaseDate/types';

import type { MercadoPagoConfig } from '@src/mercadoPagoConfig';

/**
 * Client facade for MercadoPago advanced (split) payment operations.
 */
export class AdvancedPayment {
	/** SDK configuration providing credentials and HTTP options. */
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	/**
	 * Create a new advanced (split) payment distributed among multiple sellers.
	 */
	create({ body, requestOptions }: AdvancedPaymentCreateData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return create({ body, config: this.config });
	}

	/**
	 * Retrieve an advanced payment by its ID.
	 */
	get({ id, requestOptions }: AdvancedPaymentGetData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return get({ id, config: this.config });
	}

	/**
	 * Search advanced payments with optional filters and pagination.
	 */
	search(advancedPaymentSearchOptions: AdvancedPaymentSearchData = {}): Promise<AdvancedPaymentSearchResponse> {
		const { options, requestOptions } = advancedPaymentSearchOptions;
		this.config.options = { ...this.config.options, ...requestOptions };
		return search({ options, config: this.config });
	}

	/**
	 * Update an existing advanced payment with arbitrary fields.
	 */
	update({ id, body, requestOptions }: AdvancedPaymentUpdateData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return update({ id, body, config: this.config });
	}

	/**
	 * Cancel a pending advanced payment by setting its status to `cancelled`.
	 */
	cancel({ id, requestOptions }: AdvancedPaymentCancelData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return cancel({ id, config: this.config });
	}

	/**
	 * Capture a previously authorised advanced payment.
	 */
	capture({ id, requestOptions }: AdvancedPaymentCaptureData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return capture({ id, config: this.config });
	}

	/**
	 * Change the money release date for all disbursements of an advanced payment.
	 */
	updateReleaseDate({ id, releaseDate, requestOptions }: AdvancedPaymentUpdateReleaseDateData): Promise<AdvancedPaymentResponse> {
		this.config.options = { ...this.config.options, ...requestOptions };
		return updateReleaseDate({ id, releaseDate, config: this.config });
	}
}
