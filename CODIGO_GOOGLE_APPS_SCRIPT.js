// CÓDIGO PARA GOOGLE APPS SCRIPT - COLE ESTE CÓDIGO COMPLETO

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'criar') {
      return criarPedido(data.dados);
    }
    
    if (data.action === 'atualizar_status') {
      return atualizarStatus(data.id, data.status);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Ação não reconhecida'}));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}));
  }
}

function doGet(e) {
  try {
    if (e.parameter.action === 'buscar') {
      const telefone = e.parameter.telefone;
      return buscarPedidosPorTelefone(telefone);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Parâmetros inválidos'}));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}));
  }
}

function criarPedido(dados) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Gerar ID único baseado no timestamp
    const id = 'PED' + Date.now();
    
    // Preparar dados para inserir na planilha
    const row = [
      id,                                    // A - ID do pedido
      dados.nome,                           // B - Nome do cliente
      dados.telefone,                       // C - Telefone
      dados.endereco,                       // D - Endereço
      JSON.stringify(dados.itens),          // E - Itens (JSON)
      dados.total,                          // F - Total
      dados.tipo,                           // G - Tipo pagamento
      dados.forma,                          // H - Forma pagamento
      dados.status || 'PEDIDO PROCESSANDO', // I - Status
      new Date().toLocaleDateString('pt-BR'), // J - Data
      new Date().toISOString()             // K - Timestamp completo
    ];
    
    // Inserir na planilha
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true, 
      id: id,
      message: 'Pedido criado com sucesso'
    }));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false, 
      error: 'Erro ao criar pedido: ' + error.toString()
    }));
  }
}

function buscarPedidosPorTelefone(telefone) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    const pedidos = [];
    
    // Pular cabeçalho (linha 1) e buscar pedidos
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      
      // Verificar se o telefone corresponde (coluna C)
      if (row[2] === telefone) {
        const pedido = {
          id: row[0],                    // ID
          nome: row[1],                   // Nome
          telefone: row[2],               // Telefone
          endereco: row[3],               // Endereço
          itens: JSON.parse(row[4] || '[]'), // Itens
          total: row[5],                  // Total
          tipo: row[6],                   // Tipo
          forma: row[7],                  // Forma
          status: row[8],                 // Status
          data: row[9],                   // Data
          timestamp: row[10]              // Timestamp
        };
        
        pedidos.push(pedido);
      }
    }
    
    // Ordenar por data mais recente primeiro
    pedidos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    return ContentService.createTextOutput(JSON.stringify(pedidos));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false, 
      error: 'Erro ao buscar pedidos: ' + error.toString()
    }));
  }
}

function atualizarStatus(id, novoStatus) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Procurar o pedido pelo ID
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
        // Atualizar status na coluna I (índice 8)
        sheet.getRange(i + 1, 9).setValue(novoStatus);
        
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: 'Status atualizado com sucesso'
        }));
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Pedido não encontrado'
    }));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Erro ao atualizar status: ' + error.toString()
    }));
  }
}

// FUNÇÃO AUXILIAR PARA TESTAR O SCRIPT
function testarScript() {
  console.log('Script funcionando corretamente!');
  
  // Teste de criação de pedido
  const dadosTeste = {
    nome: 'Cliente Teste',
    telefone: '11999999999',
    endereco: 'Rua Teste, 123',
    itens: [{nome: 'Botijão de Gás 13kg', qtd: 1, preco: 120}],
    total: '120.00',
    tipo: 'entrega',
    forma: 'PIX',
    status: 'PEDIDO PROCESSANDO'
  };
  
  const resultado = criarPedido(dadosTeste);
  console.log('Resultado do teste:', resultado.getContent());
}
