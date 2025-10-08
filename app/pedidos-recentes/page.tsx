'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePedidosRecentes } from '../../hooks/usePedidosRecentes';
import { limparCachePedidos } from '../../utils/googleSheets';

export default function PedidosRecentes() {
  const router = useRouter();
  const [telefone, setTelefone] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return; // Evita execução no servidor
    const t = localStorage.getItem('cliente_telefone');
    if (!t) {
      router.push('/');
      return;
    }
    setTelefone(t);
  }, [router]);

  const { pedidos, loading, error, ultimaAtualizacao, atualizar } =
    usePedidosRecentes(telefone, 30000);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PEDIDO PROCESSANDO': return 'text-yellow-400 bg-yellow-900';
      case 'PEDIDO ENVIADO': return 'text-green-400 bg-green-900';
      case 'PEDIDO ENTREGUE': return 'text-blue-400 bg-blue-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PEDIDO PROCESSANDO': return '⏳';
      case 'PEDIDO ENVIADO': return '🚚';
      case 'PEDIDO ENTREGUE': return '✅';
      default: return '📋';
    }
  };

  if (!telefone || loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Carregando seus pedidos...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center p-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">📋 Pedidos Recentes</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/produtos')}
            className="bg-green-400 text-black font-bold px-4 py-2 rounded-lg"
          >
            ← Voltar
          </motion.button>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-900 text-red-400 p-4 rounded-lg mb-6">
            {error}
          </motion.div>
        )}

        {pedidos.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-xl mb-4">Nenhum pedido encontrado</p>
            <p className="text-black">Faça seu primeiro pedido!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {pedidos.map((pedido, index) => (
              <motion.div
                key={pedido.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Pedido #{pedido.id}</h3>
                    <p className="text-black text-sm">Data: {pedido.data}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(pedido.status)}`}>
                    {getStatusIcon(pedido.status)} {pedido.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Endereço de Entrega:</h4>
                    <p className="text-black">{pedido.endereco}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Pagamento:</h4>
                    <p className="text-black">
                      {pedido.tipo === 'entrega' ? 'Na Entrega' : 'Antecipado'} - {pedido.forma}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-green-400 mb-2">Produtos:</h4>
                  <div className="space-y-1">
                    {pedido.itens.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-black">
                        <span>{item.qtd}x {item.nome}</span>
                        <span>R$ {(item.qtd * item.preco).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <span className="text-lg font-bold text-green-400">Total: R$ {pedido.total}</span>
                  {pedido.status === 'PEDIDO PROCESSANDO' && (
                    <span className="text-sm text-yellow-400 animate-pulse">Atualizando automaticamente...</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center text-sm text-black">
          <p>🔄 Os status são atualizados automaticamente a cada 30 segundos</p>
          {ultimaAtualizacao && (
            <p className="mt-2">Última atualização: {ultimaAtualizacao.toLocaleTimeString('pt-BR')}</p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { limparCachePedidos(); atualizar(); }}
            className="mt-3 bg-gray-700 text-green-400 px-4 py-2 rounded-lg text-sm border border-green-400"
          >
            🔄 Atualizar Agora
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
