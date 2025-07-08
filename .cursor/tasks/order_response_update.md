Com base no JSON fornecido abaixo, execute as seguintes etapas:

**1. Identificação de Classes Candidatas**
- Localize todos os arquivos relacionados a "Order" que terminem com "Request" (exemplo: `Response`,`OrderResponse`, `CreateOrderResponse`).
- Analise todos os arquivos relacionados

**2. Análise de Compatibilidade**
- Para cada arquivo identificado no passo 1, determine qual classe possui a estrutura mais semelhante ao contrato definido pelo JSON fornecido.
- Utilize critérios como número de propriedades correspondentes, tipos de dados, e similaridade de nomenclatura.

**3. Seleção e Verificação**
- Escolha a classe que mais se assemelha ao contrato JSON.
- Realize uma análise mais profunda para confirmar se ela realmente representa o contrato JSON desejado.

**4. Revisão de Propriedades**
- Liste as propriedades presentes no JSON que estão ausentes na classe selecionada.

**5. Atualização da Classe** Se a classe identificada no passo 3 estiver desatualizada em relação ao JSON fornecido, atualize-a:
    - **Adicione propriedades ausentes:**  Inclua todas as propriedades presentes no JSON que não existem na classe.
    - **Siga o padrão e regras:** Assegure que as novas propriedades sigam o mesmo padrão de nomenclatura, tipagem e documentação (se houver) utilizado na classe existente.
    - **Não remova as propriedades obsoletas:** Marque como obsoletas (nos comentários) as propriedades da classe que não estão no JSON, mas não as remova.

**6. Registro de Alterações**
- Se o arquivo já existir, atuialize, se não crie um arquivo de log chamado `CHANGELOG_ORDER_RESPONSE.md`, documentando todas as alterações com comparações divido entre "antes" e "depois". 
- Adicione o Json de Exemplo ao log para documentação.

## JSON exemplo
{
  "id": "ORD01HRYFWNYRE1MR1E60MW3X0T2P",
  "type": "online",
  "processing_mode": "automatic",
  "external_reference": "ext_ref_1234",
  "description": "some description",
  "marketplace": "NONE",
  "marketplace_fee": "10.00",
  "total_amount": "1000.00",
  "total_paid_amount": "1000.00",
  "country_code": "BRA",
  "user_id": "1245621468",
  "status": "processed",
  "status_detail": "accredited",
  "capture_mode": "automatic_async",
  "created_date": "2024-11-21T14:19:14.727Z",
  "last_updated_date": "2024-11-21T14:19:18.489Z",
  "integration_data": {
    "application_id": "130106526144588"
  },
  "transactions": {
    "payments": [
      {
        "id": "PAY01JD7HETD7WX4W31VA60R1KC8E",
        "amount": "1000.00",
        "paid_amount": "1000.00",
        "expiration_time": "P1D",
        "date_of_expiration": "2024-01-01T00:00:00.000-03:00",
        "reference_id": "22dvqmsf4yc",
        "status": "processed",
        "status_detail": "accredited",
        "payment_method": {
          "id": "master",
          "type": "credit_card",
          "token": "677859ef5f18ea7e3a87c41d02c3fbe3",
          "statement_descriptor": "LOJA X",
          "installments": 1
        }
      }
    ]
  },
  "items":[
    {
    "external_code": "item_external_code",
    "category_id": "category_id",
    "title": "Some item title",
    "description": "Some item description",
    "unit_price": "1000.00",
    "type": "item type",
    "picture_url": "https://mysite.com/img/item.jpg",
    "quantity": 1
  }
  ]
}