# 📋 Configuração do Google Apps Script para Pedidos Recentes

## 🎯 Funcionalidades Implementadas

✅ **Botão "Pedidos Recentes"** na página de produtos  
✅ **Página de pedidos recentes** com busca por telefone  
✅ **Status automático "PEDIDO PROCESSANDO"** ao finalizar pedido  
✅ **Atualização em tempo real** a cada 30 segundos  
✅ **Interface responsiva** com animações  

## 🔧 Configuração do Google Apps Script

Para que o sistema funcione completamente, você precisa configurar o Google Apps Script com as seguintes funções:

### 1. **Função para Criar Pedidos**
```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  if (data.action === 'criar') {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = [
      new Date().toISOString(), // Timestamp
      data.dados.nome,
      data.dados.telefone,
      data.dados.endereco,
      JSON.stringify(data.dados.itens),
      data.dados.total,
      data.dados.tipo,
      data.dados.forma,
      data.dados.status || 'PEDIDO PROCESSANDO',
      data.dados.data || new Date().toLocaleDateString('pt-BR')
    ];
    
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({success: true}));
  }
  
  if (data.action === 'atualizar_status') {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === data.id) { // Assumindo que ID está na primeira coluna
        sheet.getRange(i + 1, 9).setValue(data.status); // Status na coluna 9
        break;
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true}));
  }
}
```

### 2. **Função para Buscar Pedidos**
```javascript
function doGet(e) {
  if (e.parameter.action === 'buscar') {
    const telefone = e.parameter.telefone;
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    const pedidos = [];
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][2] === telefone) { // Telefone na coluna 3
        pedidos.push({
          id: values[i][0],
          nome: values[i][1],
          telefone: values[i][2],
          endereco: values[i][3],
          itens: JSON.parse(values[i][4]),
          total: values[i][5],
          tipo: values[i][6],
          forma: values[i][7],
          status: values[i][8],
          data: values[i][9]
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify(pedidos));
  }
}
```

## 📊 Estrutura da Planilha

| Coluna | Campo | Descrição |
|--------|-------|-----------|
| A | ID | Identificador único do pedido |
| B | Nome | Nome do cliente |
| C | Telefone | Telefone do cliente |
| D | Endereço | Endereço de entrega |
| E | Itens | JSON com produtos e quantidades |
| F | Total | Valor total do pedido |
| G | Tipo | Tipo de pagamento (entrega/antecipado) |
| H | Forma | Forma de pagamento (PIX, dinheiro, etc.) |
| I | Status | Status do pedido |
| J | Data | Data do pedido |

## 🔄 Fluxo de Status

1. **PEDIDO PROCESSANDO** - Enviado automaticamente ao finalizar pedido
2. **PEDIDO ENVIADO** - Alterado manualmente na planilha
3. **PEDIDO ENTREGUE** - Alterado manualmente na planilha

## 🚀 Como Usar

1. **Cliente faz pedido** → Status: "PEDIDO PROCESSANDO"
2. **Cliente clica "Pedidos Recentes"** → Vê o pedido com status atual
3. **Você altera na planilha** → Status atualiza automaticamente no site
4. **Cliente vê atualização** → Interface mostra novo status

## ⚙️ Configurações Importantes

- **URL do Script**: Substitua a URL atual pela sua própria
- **Permissões**: Configure as permissões para acessar Google Sheets
- **CORS**: O script está configurado para funcionar com `no-cors`
- **Atualização**: Pedidos são atualizados a cada 30 segundos

## 🎨 Interface

- **Status PROCESSANDO**: Amarelo com ícone ⏳
- **Status ENVIADO**: Verde com ícone 🚚  
- **Status ENTREGUE**: Azul com ícone ✅
- **Atualização manual**: Botão "🔄 Atualizar Agora"
- **Tempo real**: Atualização automática a cada 30s
