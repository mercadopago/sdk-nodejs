import get from './get';

import type { MercadoPagoConfig } from '../../MercadoPagoConfig';
import { CardTokenId, CardTokenRequest } from './get/types';

export class CardToken {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	get({ cardTokenId }: CardTokenId): Promise<CardTokenRequest> {
		return get({ id: cardTokenId, config: this.config })
	}
}
