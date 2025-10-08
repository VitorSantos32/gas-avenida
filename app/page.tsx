'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleStart = () => {
    if (!nome || !telefone) {
      alert('Preencha seu nome e telefone para continuar!');
      return;
    }
    localStorage.setItem('cliente_nome', nome);
    localStorage.setItem('cliente_telefone', telefone);
    router.push('/produtos');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black green-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/empresa.png"
            alt="Logo Gás Avenida"
            width={180}
            height={180}
            className="mx-auto mb-6 rounded-full border-4 border-green-400 shadow-lg"
          />
        </motion.div>

        <h1 className="text-4xl font-bold mb-2">Bem-vindo à Gás Avenida</h1>
        <p className="text-lg mb-6">Entrega rápida de gás e água direto na sua porta!</p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3 w-72 mx-auto"
        >
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="tel"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="p-3 rounded-lg text-black outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#7bf84aff' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="bg-green-400 text-black font-bold p-3 rounded-lg mt-2 transition-all"
          >
            Fazer Pedido
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
