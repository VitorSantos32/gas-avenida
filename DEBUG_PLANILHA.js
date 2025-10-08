// TESTE DE DEBUG - Cole este código no Google Apps Script para investigar

function debugPlanilha() {
  console.log('=== DEBUG DA PLANILHA ===');
  
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    console.log('Nome da planilha:', sheet.getName());
    console.log('Total de linhas:', values.length);
    console.log('Total de colunas:', values[0] ? values[0].length : 0);
    
    if (values.length > 0) {
      console.log('Cabeçalhos (linha 1):', values[0]);
    }
    
    if (values.length > 1) {
      console.log('Primeira linha de dados (linha 2):', values[1]);
      console.log('Telefone na linha 2, coluna C:', values[1][2]);
      console.log('Tipo do telefone:', typeof values[1][2]);
    }
    
    // Verificar todas as linhas com dados
    console.log('\n=== TODAS AS LINHAS COM DADOS ===');
    for (let i = 1; i < Math.min(values.length, 10); i++) { // Mostrar até 10 linhas
      const row = values[i];
      console.log(`Linha ${i + 1}:`, row);
      console.log(`  - Telefone (coluna C): "${row[2]}" (tipo: ${typeof row[2]})`);
      console.log(`  - Status (coluna I): "${row[8]}"`);
    }
    
    // Teste de busca específica
    console.log('\n=== TESTE DE BUSCA ===');
    const telefonesTeste = ['123', '11999999999', '(11) 99999-9999'];
    
    telefonesTeste.forEach(telefone => {
      console.log(`\n--- Testando: "${telefone}" ---`);
      const resultado = buscarPedidosPorTelefone(telefone);
      console.log('Resultado:', resultado.getContent());
    });
    
  } catch (error) {
    console.log('ERRO NO DEBUG:', error.toString());
  }
}

// FUNÇÃO PARA VERIFICAR SE A PLANILHA ESTÁ CORRETA
function verificarEstruturaPlanilha() {
  console.log('=== VERIFICAÇÃO DA ESTRUTURA ===');
  
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    if (values.length === 0) {
      console.log('❌ PLANILHA VAZIA!');
      return;
    }
    
    const cabecalhos = values[0];
    console.log('Cabeçalhos encontrados:', cabecalhos);
    
    // Verificar se os cabeçalhos estão corretos
    const cabecalhosEsperados = ['ID', 'Nome', 'Telefone', 'Endereço', 'Itens', 'Total', 'Tipo', 'Forma', 'Status', 'Data', 'Timestamp'];
    
    console.log('\nVerificação dos cabeçalhos:');
    cabecalhosEsperados.forEach((esperado, index) => {
      const atual = cabecalhos[index] || '';
      const status = atual.includes(esperado) || esperado.includes(atual) ? '✅' : '❌';
      console.log(`${status} Coluna ${String.fromCharCode(65 + index)}: Esperado "${esperado}", Encontrado "${atual}"`);
    });
    
    // Verificar se há dados
    if (values.length === 1) {
      console.log('⚠️  APENAS CABEÇALHOS - NENHUM PEDIDO ENCONTRADO');
    } else {
      console.log(`✅ ${values.length - 1} pedidos encontrados na planilha`);
    }
    
  } catch (error) {
    console.log('ERRO:', error.toString());
  }
}
