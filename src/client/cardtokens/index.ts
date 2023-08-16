import get from './get';
import create from './create';
import type { MercadoPagoConfig } from '../../MercadoPagoConfig';
import { CardTokenId, CardTokenResponse } from './get/types';
import { CardTokenBody } from './create/types';

export class CardToken {
	private config: MercadoPagoConfig;

	constructor(mercadoPagoConfig: MercadoPagoConfig) {
		this.config = mercadoPagoConfig;
	}

	get({ cardTokenId }: CardTokenId): Promise<CardTokenResponse> {
		return get({ id: cardTokenId, config: this.config });
	}

	create ({ cardTokenBody }: CardTokenBody): Promise<CardTokenResponse> {
		return create({ body: cardTokenBody, config: this.config });
	}
}
