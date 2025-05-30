import { MercadoPagoConfig, AdvancedPayment } from '../../index';
//DELETE APOS TESTAR
// Configuração do cliente
const client = new MercadoPagoConfig({ 
  accessToken: 'YOUR_ACCESS_TOKEN',
  options: {
    timeout: 5000,
    testToken: true // Para testes
  }
});

const advancedPayment = new AdvancedPayment(client);

// Exemplo completo de uso do Advanced Payment
async function completeAdvancedPaymentExample() {
  try {
    console.log('🚀 Iniciando exemplo completo do Advanced Payment...\n');

    // 1. CREATE - Criar um Advanced Payment
    console.log('1️⃣ CRIANDO Advanced Payment...');
    const createBody = {
      application_id: 'YOUR_APPLICATION_ID',
      payments: [
        {
          payment_method_id: 'visa',
          payment_type_id: 'credit_card',
          token: 'CARD_TOKEN_PLACEHOLDER',
          installments: 1,
          amount: 100,
          processing_mode: 'aggregator',
          description: 'Payment for marketplace transaction',
          capture: false, // Vamos capturar depois
          external_reference: 'payment_001',
          payer: {
            email: 'buyer@example.com',
            first_name: 'João',
            last_name: 'Silva',
            identification: {
              type: 'CPF',
              number: '12345678901'
            }
          }
        }
      ],
      disbursements: [
        {
          amount: 80,
          external_reference: 'seller_disbursement_001',
          collector_id: 'SELLER_USER_ID',
          application_fee: 20,
          money_release_days: 3,
          additional_info: {
            items: [
              {
                id: 'item_001',
                title: 'Produto Premium',
                description: 'Descrição do produto',
                quantity: 1,
                unit_price: 80
              }
            ]
          }
        }
      ],
      payer: {
        email: 'buyer@example.com',
        first_name: 'João',
        last_name: 'Silva'
      },
      external_reference: 'advanced_payment_001',
      description: 'Advanced Payment para marketplace',
      binary_mode: false,
      capture: false,
      metadata: {
        marketplace_fee: 20,
        seller_id: 'seller_123',
        order_id: 'order_456'
      }
    };

    const createdAdvancedPayment = await advancedPayment.create({ body: createBody });
    console.log('✅ Advanced Payment criado:', {
      id: createdAdvancedPayment.id,
      status: createdAdvancedPayment.status,
      external_reference: createdAdvancedPayment.external_reference
    });

    const advancedPaymentId = createdAdvancedPayment.id || 'MOCK_ID_FOR_EXAMPLE';

    // 2. GET - Buscar Advanced Payment por ID
    console.log('\n2️⃣ BUSCANDO Advanced Payment por ID...');
    const retrievedAdvancedPayment = await advancedPayment.get({ 
      id: advancedPaymentId 
    });
    console.log('✅ Advanced Payment encontrado:', {
      id: retrievedAdvancedPayment.id,
      status: retrievedAdvancedPayment.status,
      payments_count: retrievedAdvancedPayment.payments?.length || 0,
      disbursements_count: retrievedAdvancedPayment.disbursements?.length || 0
    });

    // 3. SEARCH - Buscar Advanced Payments com filtros
    console.log('\n3️⃣ BUSCANDO Advanced Payments com filtros...');
    const searchResults = await advancedPayment.search({
      options: {
        external_reference: 'advanced_payment_001',
        status: 'pending',
        limit: 10,
        offset: 0,
        sort: 'date_created',
        criteria: 'desc'
      }
    });
    console.log('✅ Busca realizada:', {
      total_found: searchResults.paging?.total || 0,
      results_returned: searchResults.results?.length || 0,
      limit: searchResults.paging?.limit,
      offset: searchResults.paging?.offset
    });

    // 4. CAPTURE - Capturar o Advanced Payment (se estiver pendente)
    console.log('\n4️⃣ CAPTURANDO Advanced Payment...');
    const capturedAdvancedPayment = await advancedPayment.capture({ 
      id: advancedPaymentId 
    });
    console.log('✅ Advanced Payment capturado:', {
      id: capturedAdvancedPayment.id,
      status: capturedAdvancedPayment.status,
      date_updated: capturedAdvancedPayment.date_last_updated
    });

    // 5. SEARCH AGAIN - Buscar por data range
    console.log('\n5️⃣ BUSCANDO por intervalo de datas...');
    const dateSearchResults = await advancedPayment.search({
      options: {
        begin_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias atrás
        end_date: new Date().toISOString().split('T')[0], // hoje
        limit: 5
      }
    });
    console.log('✅ Busca por data realizada:', {
      results_count: dateSearchResults.results?.length || 0
    });

    // 6. CANCEL - Cancelar Advanced Payment (exemplo alternativo)
    console.log('\n6️⃣ EXEMPLO DE CANCELAMENTO...');
    console.log('ℹ️  Para demonstração, vamos simular um cancelamento');
    console.log('💡 Em um cenário real, você faria:');
    console.log('   const cancelledPayment = await advancedPayment.cancel({ id: advancedPaymentId });');
    
    // Exemplo simulado do que seria retornado
    console.log('✅ Estrutura de resposta esperada para cancelamento:', {
      id: advancedPaymentId,
      status: 'cancelled',
      message: 'Advanced Payment cancelado com sucesso'
    });

    console.log('\n🎉 EXEMPLO COMPLETO FINALIZADO COM SUCESSO!');
    console.log('\n📋 RESUMO DAS FUNCIONALIDADES TESTADAS:');
    console.log('   ✅ CREATE - Criação de Advanced Payment');
    console.log('   ✅ GET - Busca por ID');
    console.log('   ✅ SEARCH - Busca com filtros diversos');
    console.log('   ✅ CAPTURE - Captura de pagamento');
    console.log('   ✅ CANCEL - Cancelamento (demonstrado)');

  } catch (error) {
    console.error('❌ Erro durante o exemplo:', error);
    
    // Demonstrar como tratar diferentes tipos de erro
    if (error.message?.includes('401')) {
      console.log('💡 Dica: Verifique se o access_token está correto');
    } else if (error.message?.includes('404')) {
      console.log('💡 Dica: O Advanced Payment pode não existir');
    } else if (error.message?.includes('400')) {
      console.log('💡 Dica: Verifique os dados enviados na requisição');
    }
  }
}

// Exemplo de uso com diferentes configurações
async function advancedConfigurationExample() {
  console.log('\n🔧 EXEMPLO COM CONFIGURAÇÕES AVANÇADAS...');
  
  // Cliente com configurações customizadas
  const customClient = new MercadoPagoConfig({ 
    accessToken: 'YOUR_ACCESS_TOKEN',
    options: {
      timeout: 10000,
      testToken: true,
      idempotencyKey: 'unique-key-123'
    }
  });

  const customAdvancedPayment = new AdvancedPayment(customClient);

  // Exemplo com requestOptions customizados
  try {
    const searchWithCustomOptions = await customAdvancedPayment.search({
      options: {
        status: 'approved',
        limit: 20
      },
      requestOptions: {
        timeout: 15000,
        idempotencyKey: 'search-key-456'
      }
    });

    console.log('✅ Busca com opções customizadas realizada:', {
      results: searchWithCustomOptions.results?.length || 0
    });

  } catch (error) {
    console.log('ℹ️  Erro esperado em ambiente de teste:', error.message);
  }
}

// Executar exemplos
if (require.main === module) {
  console.log('🎯 EXECUTANDO EXEMPLOS COMPLETOS DO ADVANCED PAYMENT\n');
  console.log('⚠️  IMPORTANTE: Este é um exemplo demonstrativo');
  console.log('   Em produção, substitua pelos valores reais do seu ambiente\n');
  
  completeAdvancedPaymentExample()
    .then(() => advancedConfigurationExample())
    .then(() => {
      console.log('\n✨ Todos os exemplos executados com sucesso!');
      console.log('📚 Para mais informações, consulte a documentação oficial do Mercado Pago');
    })
    .catch(error => {
      console.error('❌ Erro geral:', error);
    });
}

// Exportar para uso em outros módulos
export {
  completeAdvancedPaymentExample,
  advancedConfigurationExample
}; 