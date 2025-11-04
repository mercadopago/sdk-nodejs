/**
 * Mercado Pago Handle 3DS Response Example.
 *
 * This example demonstrates how to handle different 3DS authentication scenarios
 * and check the status of transactions after 3DS challenge completion.
 *
 * @see {@link https://mercadopago.com/developers/en/reference/orders/online-payments/get/get Documentation }.
 */

import { Order } from '@src/clients/order';
import MercadoPago from '@src/index';

const mercadoPagoConfig = new MercadoPago({ accessToken: '<ACCESS_TOKEN>', options: { timeout: 5000 } });

const order = new Order(mercadoPagoConfig);

/**
 * Function to handle 3DS response and check payment status
 */
async function handle3DSResponse(orderId: string): Promise<void> {
	try {
		const response = await order.get({ id: orderId });
		
		console.log('Order status:', response.status);
		console.log('Order status detail:', response.status_detail);
		
		const payment = response.transactions?.payments?.[0];
		
		if (!payment) {
			console.log('No payment found in order');
			return;
		}
		
		console.log('Payment status:', payment.status);
		console.log('Payment status detail:', payment.status_detail);
		
		// Handle different 3DS scenarios
		switch (payment.status) {
		case 'processed':
			if (payment.status_detail === 'accredited') {
				console.log('✅ Payment approved successfully (with or without 3DS)');
			}
			break;
			
		case 'action_required':
			if (payment.status_detail === 'pending_challenge') {
				const challengeUrl = payment.payment_method?.transaction_security?.url;
				console.log('⏳ 3DS Challenge required');
				console.log('Challenge URL:', challengeUrl);
				console.log('Display this URL in an iframe and listen for completion events');
			}
			break;
			
		case 'failed':
			switch (payment.status_detail) {
			case 'cc_rejected_3ds_challenge':
				console.log('❌ Payment rejected due to 3DS challenge failure');
				break;
			case 'failed':
				console.log('❌ Payment rejected without authentication');
				break;
			default:
				console.log('❌ Payment failed:', payment.status_detail);
			}
			break;
			
		case 'cancelled':
			if (payment.status_detail === 'expired') {
				console.log('⏰ Payment cancelled - 3DS challenge expired (5 minutes timeout)');
			}
			break;
			
		default:
			console.log('🔄 Payment in progress:', payment.status);
		}
		
		// Display 3DS security information if available
		const transactionSecurity = payment.payment_method?.transaction_security;
		if (transactionSecurity) {
			console.log('\n3DS Security Information:');
			console.log('- Validation:', transactionSecurity.validation);
			console.log('- Liability Shift:', transactionSecurity.liability_shift);
			console.log('- Status:', transactionSecurity.status);
			console.log('- Type:', transactionSecurity.type);
		}
		
	} catch (error) {
		console.error('Error checking order status:', error);
	}
}

// Example usage
const orderId = '<ORDER_ID>';
handle3DSResponse(orderId);

/**
 * Example of JavaScript code to handle iframe events on the frontend
 */
const frontendIframeHandler = `
// Add this to your frontend to handle 3DS iframe completion
window.addEventListener("message", (e) => {
    if (e.data.status === "COMPLETE") {
        // 3DS challenge completed - redirect to confirmation page
        window.open("congrats.html");
        
        // Or make a request to check the final payment status
        checkPaymentStatus();
    }
});

async function checkPaymentStatus() {
    const orderId = localStorage.getItem("orderId");
    try {
        const response = await fetch(\`/api/orders/\${orderId}\`, {
            method: "GET",
        });
        const result = await response.json();
        
        if (result.status === "processed") {
            // Payment successful
            showSuccessMessage(result);
        } else if (result.status === "failed") {
            // Payment failed
            showErrorMessage(result);
        } else {
            // Still processing - retry after a delay
            setTimeout(checkPaymentStatus, 2000);
        }
    } catch (error) {
        console.error("Error checking payment status:", error);
    }
}
`;

console.log('\nFrontend iframe handler code:');
console.log(frontendIframeHandler);
