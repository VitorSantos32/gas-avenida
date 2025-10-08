'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TipoPagamento() {
  const router = useRouter();

  const escolher = (tipo: string) => {
    localStorage.setItem('tipo_pagamento', tipo);
    router.push('/pagamento');
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-6">
      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-8">
        Como deseja pagar?
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#7bf84aff' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => escolher('entrega')}
        className="bg-green-400 text-black font-bold py-3 px-8 rounded-lg mb-4 w-64"
      >
        Pagar na Entrega
      </motion.button>
    </div>
  );
}
