import { useEffect, useState, useCallback } from 'react';
import { PedidoCompleto, buscarPedidosPorTelefone } from '../utils/googleSheets';

export const usePedidosRecentes = (telefone: string, intervaloMs: number = 30000) => {
  const [pedidos, setPedidos] = useState<PedidoCompleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<Date | null>(null);

  const buscarPedidos = useCallback(async () => {
    if (!telefone) return;

    try {
      setLoading(true);
      
      // Buscar pedidos reais do Google Sheets
      const pedidosReais = await buscarPedidosPorTelefone(telefone);
      
      // Usar apenas pedidos reais (não mais dados simulados)
      setPedidos(pedidosReais);
      setError('');
      setUltimaAtualizacao(new Date());
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  }, [telefone]);

  useEffect(() => {
    buscarPedidos();
    
    // Configurar atualização automática
    const interval = setInterval(buscarPedidos, intervaloMs);
    
    return () => clearInterval(interval);
  }, [buscarPedidos, intervaloMs]);

  return {
    pedidos,
    loading,
    error,
    ultimaAtualizacao,
    atualizar: buscarPedidos
  };
};
