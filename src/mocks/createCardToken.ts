import fetch from 'node-fetch';

async function createCardToken(token: string) {
	const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			site_id: 'MLB',
			card_number: '5031433215406351',
			expiration_year: '2099',
			expiration_month: '11',
			security_code: '123',
			cardholder: {
				identification: {
					type: 'CPF',
					number: '01234567890'
				},
				name: 'APRO'
			}
		})
	});
	return await response.json();
}

export {
	createCardToken
};
