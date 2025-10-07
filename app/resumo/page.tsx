'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Resumo() {
  const router = useRouter();
  const [dados, setDados] = useState<any>({});

  useEffect(() => {
    const nome = localStorage.getItem('cliente_nome');
    const telefone = localStorage.getItem('cliente_telefone');
    const itens = JSON.parse(localStorage.getItem('pedido_itens') || '[]');
    const total = localStorage.getItem('pedido_total');
    const endereco = localStorage.getItem('endereco');
    const tipo = localStorage.getItem('tipo_pagamento');
    const forma = localStorage.getItem('forma_pagamento');
    setDados({ nome, telefone, itens, total, endereco, tipo, forma });
  }, []);

  const finalizar = () => {
    alert('Pedido realizado com sucesso!');
    localStorage.clear();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center p-6">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
        Resumo do Pedido
      </motion.h1>

      <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-2xl">
        <p><strong>Cliente:</strong> {dados.nome}</p>
        <p><strong>Telefone:</strong> {dados.telefone}</p>
        <p><strong>Endereço:</strong> {dados.endereco}</p>
        <p><strong>Tipo de Pagamento:</strong> {dados.tipo === 'entrega' ? 'Na Entrega' : 'Antecipado'}</p>
        <p><strong>Forma de Pagamento:</strong> {dados.forma}</p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">Produtos:</h2>
        <ul>
          {dados.itens?.map((item: any, i: number) => (
            <li key={i} className="mb-1">
              {item.qtd}x {item.nome} — R$ {(item.qtd * item.preco).toFixed(2)}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold mt-4">Total: R$ {dados.total}</h3>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#7bf84aff' }}
        whileTap={{ scale: 0.95 }}
        onClick={finalizar}
        className="mt-6 bg-green-400 text-black font-bold py-3 px-8 rounded-lg"
      >
        Finalizar Pedido
      </motion.button>
    </div>
  );
}
