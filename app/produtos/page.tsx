'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Produtos() {
  const router = useRouter();
  const [itens, setItens] = useState<{ nome: string; preco: number; img: string; qtd: number }[]>([
    { nome: 'Botijão de Gás 13kg', preco: 120, img: '/gas.png', qtd: 0 },
    { nome: 'Água Mineral 20L', preco: 10, img: '/agua.png', qtd: 0 },
  ]);

  const adicionar = (index: number) => {
    const novo = [...itens];
    novo[index].qtd++;
    setItens(novo);
  };

  const remover = (index: number) => {
    const novo = [...itens];
    if (novo[index].qtd > 0) novo[index].qtd--;
    setItens(novo);
  };

  const total = itens.reduce((acc, item) => acc + item.qtd * item.preco, 0);

  const continuar = () => {
    const selecionados = itens.filter(i => i.qtd > 0);
    if (selecionados.length === 0) {
      alert('Selecione pelo menos um produto!');
      return;
    }
    localStorage.setItem('pedido_itens', JSON.stringify(selecionados));
    localStorage.setItem('pedido_total', total.toString());
    router.push('/pagamento/tipo');
  };

  const verPedidosRecentes = () => {
    router.push('/pedidos-recentes');
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center p-6">
      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-6">
        Escolha seus produtos
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {itens.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-4 rounded-2xl flex flex-col items-center shadow-lg"
          >
            <Image src={item.img} alt={item.nome} width={120} height={120} className="mb-3 rounded-xl" />
            <h2 className="text-xl font-semibold">{item.nome}</h2>
            <p className="text-lg mb-3">R$ {item.preco.toFixed(2)}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => remover(i)} className="bg-green-400 text-black rounded-full w-8 h-8 font-bold">-</button>
              <span>{item.qtd}</span>
              <button onClick={() => adicionar(i)} className="bg-green-400 text-black rounded-full w-8 h-8 font-bold">+</button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
        <h3 className="text-2xl font-bold mb-3">Total: R$ {total.toFixed(2)}</h3>
        <div className="flex flex-col gap-3">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#7bf84aff' }}
            whileTap={{ scale: 0.95 }}
            onClick={continuar}
            className="bg-green-400 text-black font-bold p-3 rounded-lg"
          >
            Continuar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#374151' }}
            whileTap={{ scale: 0.95 }}
            onClick={verPedidosRecentes}
            className="bg-gray-700 text-green-400 font-bold p-3 rounded-lg border border-green-400"
          >
             Pedidos Recentes
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
