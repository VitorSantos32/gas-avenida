// CÓDIGO ATUALIZADO PARA GOOGLE APPS SCRIPT - BUSCA INTELIGENTE

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
    
    const id = 'PED' + Date.now();
    
    const row = [
      id,
      dados.nome,
      dados.telefone,
      dados.endereco,
      JSON.stringify(dados.itens),
      dados.total,
      dados.tipo,
      dados.forma,
      dados.status || 'PEDIDO PROCESSANDO',
      new Date().toLocaleDateString('pt-BR'),
      new Date().toISOString()
    ];
    
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

// FUNÇÃO PARA EXTRAIR NÚMEROS DE UMA STRING
function extrairNumeros(texto) {
  if (!texto) return [];
  const numeros = String(texto).match(/\d+/g) || [];
  return [...new Set(numeros)].sort((a, b) => b.length - a.length);
}

// FUNÇÃO PARA VERIFICAR COMPATIBILIDADE DE TELEFONES
function telefonesCompativeis(telefone1, telefone2) {
  const numeros1 = extrairNumeros(telefone1);
  const numeros2 = extrairNumeros(telefone2);
  
  // Se algum número de telefone1 está contido em telefone2 ou vice-versa
  return numeros1.some(n1 => numeros2.some(n2 => n1.includes(n2) || n2.includes(n1)));
}

function buscarPedidosPorTelefone(telefone) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    console.log('Total de linhas na planilha:', values.length);
    console.log('Buscando telefone:', telefone);
    console.log('Números extraídos do telefone:', extrairNumeros(telefone));
    
    const pedidos = [];
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const telefonePlanilha = String(row[2] || '');
      
      console.log('Linha', i, 'telefone da planilha:', telefonePlanilha);
      console.log('Números da planilha:', extrairNumeros(telefonePlanilha));
      
      // Busca inteligente: verifica compatibilidade de números
      if (telefonesCompativeis(telefone, telefonePlanilha)) {
        console.log('✅ Pedido compatível encontrado na linha', i);
        const pedido = {
          id: row[0],
          nome: row[1],
          telefone: row[2],
          endereco: row[3],
          itens: JSON.parse(row[4] || '[]'),
          total: row[5],
          tipo: row[6],
          forma: row[7],
          status: row[8],
          data: row[9],
          timestamp: row[10]
        };
        
        pedidos.push(pedido);
      }
    }
    
    console.log('Total de pedidos compatíveis encontrados:', pedidos.length);
    
    return ContentService.createTextOutput(JSON.stringify(pedidos));
  } catch (error) {
    console.log('Erro ao buscar pedidos:', error);
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
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === id) {
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

// FUNÇÃO DE TESTE MELHORADA
function testarScript() {
  console.log('=== TESTE DO SCRIPT COM BUSCA INTELIGENTE ===');
  
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getDataRange();
    
    console.log('Planilha encontrada!');
    console.log('Total de linhas:', values.length);
    
    if (values.length > 1) {
      console.log('Primeira linha (cabeçalhos):', values[0]);
      console.log('Segunda linha (primeiro pedido):', values[1]);
    }
    
    // Teste de busca com diferentes formatos
    const telefonesTeste = ['123', '11999999999', '(11) 99999-9999', '11 99999-9999'];
    
    telefonesTeste.forEach(telefone => {
      console.log(`\n--- Testando busca para: ${telefone} ---`);
      const resultado = buscarPedidosPorTelefone(telefone);
      console.log('Resultado:', resultado.getContent());
    });
    
  } catch (error) {
    console.log('ERRO:', error.toString());
  }
}
