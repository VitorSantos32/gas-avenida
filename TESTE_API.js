// TESTE DIRETO DA API - Cole este código no console do navegador para testar

async function testarAPI() {
  const telefone = '11999999999'; // Substitua pelo telefone que você usou
  const url = `https://script.google.com/macros/s/AKfycbz_zF2T4CHdsZM9xkRmVTrnHesYvhFvkwxvnoAQSRnXRpVSQxfw_Q3Noag-AFCfrviJ/exec?action=buscar&telefone=${telefone}`;
  
  console.log('Testando URL:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Status da resposta:', response.status);
    console.log('Headers:', response.headers);
    
    const data = await response.text();
    console.log('Resposta bruta:', data);
    
    try {
      const jsonData = JSON.parse(data);
      console.log('JSON parseado:', jsonData);
    } catch (e) {
      console.log('Não é JSON válido:', e);
    }
    
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

// Execute no console: testarAPI()
