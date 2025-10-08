'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Endereco() {
  const router = useRouter();
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');

  const continuar = () => {
    if (!rua.trim() || !numero.trim() || !bairro.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const endereco = `${rua}, nº ${numero} - ${bairro}${complemento ? ` (${complemento})` : ''}`;
    localStorage.setItem('endereco', endereco);
    router.push('/resumo');
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Informe o endereço de entrega
      </motion.h1>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col space-y-4">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Rua *"
          className="p-3 rounded-lg text-black"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />
        <div className="flex space-x-4">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Número *"
            className="p-3 rounded-lg text-black w-1/2"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Bairro *"
            className="p-3 rounded-lg text-black w-1/2"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          placeholder="Complemento (opcional)"
          className="p-3 rounded-lg text-black"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#7bf84aff' }}
        whileTap={{ scale: 0.95 }}
        onClick={continuar}
        className="mt-8 bg-green-400 text-black font-bold py-3 px-8 rounded-lg shadow-lg"
      >
        Continuar
      </motion.button>
    </div>
  );
}
