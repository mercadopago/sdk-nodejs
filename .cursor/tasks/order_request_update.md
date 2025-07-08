Com base no JSON fornecido abaixo, execute as seguintes etapas:

**1. Identificação de Classes Candidatas**
- Localize todos os arquivos relacionados a "Order" que terminem com "Request" (exemplo: `Request`,`OrderRequest`, `CreateOrderRequest`).
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
- Se o arquivo já existir, atuialize, se não crie um arquivo de log chamado `CHANGELOG_ORDER_REQUEST.md`, documentando todas as alterações com comparações divido entre "antes" e "depois". 
- Adicione o Json de Exemplo ao log para documentação.

## JSON exemplo
{
  "type": "online",
  "total_amount": "1000.00",
  "external_reference": "ext_ref_1234",
  "capture_mode": "automatic_async",
  "transactions": {
    "payments": [
      {
        "amount": "1000.00",
        "expiration_time": "P1D",
        "payment_method": {
          "id": "master",
          "type": "credit_card",
          "token": "677859ef5f18ea7e3a87c41d02c3fbe3",
          "installments": 1,
          "statement_descriptor": "LOJA X"
        }
      }
    ]
  },
  "processing_mode": "automatic",
  "description": "some description",
  "payer": {
    "entity_type": "individual",
    "email": "test_123@testuser.com",
    "first_name": "John",
    "last_name": "Doe",
    "identification": {
      "type": "CPF",
      "number": "15635614680"
    },
    "phone": {
      "area_code": "55",
      "number": "99999999999"
    },
    "address": {
      "street_name": "R. Ângelo Piva",
      "street_number": "144",
      "zip_code": "06210110",
      "neighborhood": "Presidente Altino",
      "city": "Osasco",
      "state": "SP",
      "complement": "303"
    }
  },
  "marketplace": "NONE",
  "marketplace_fee": "10.00",
  "items": [
    {
      "title": "Some item title",
      "unit_price": "1000.00",
      "quantity": 1,
      "description": "Some item description",
      "external_code": "item_external_code",
      "category_id": "category_id",
      "type": "item type",
      "picture_url": "https://mysite.com/img/item.jpg"
    }
  ],
  "expiration_time": "P3D"
}