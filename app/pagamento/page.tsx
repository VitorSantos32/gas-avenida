'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Pagamento() {
  const router = useRouter();
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('tipo_pagamento');
    if (!t) router.push('/pagamento/tipo');
    else setTipo(t);
  }, [router]);

  const formasEntrega = ['Pix', 'Dinheiro', 'Cartão Crédito', 'Cartão Débito'];
  const formasAntecipado = ['Pix'];

  const selecionar = (forma: string) => {
    localStorage.setItem('forma_pagamento', forma);
    router.push('/endereco');
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-6">
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-8">
        Escolha a forma de pagamento
      </motion.h1>

      {(tipo === 'entrega' ? formasEntrega : formasAntecipado).map((forma, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.05, backgroundColor: '#7bf84aff' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => selecionar(forma)}
          className="bg-green-400 text-black font-bold py-3 px-8 rounded-lg mb-4 w-64"
        >
          {forma}
        </motion.button>
      ))}
    </div>
  );
}
