"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BemVindoPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleContinuar = () => {
    if (nome.trim() === "" || telefone.trim() === "") {
      alert("Por favor, preencha seu nome e telefone antes de continuar.");
      return;
    }

    // Salvar nome e telefone localmente (para usar depois)
    localStorage.setItem("cliente_nome", nome);
    localStorage.setItem("cliente_telefone", telefone);

    router.push("/produtos");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center px-6">
      {/* Logo animada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/empresa.png"
          alt="Logo Gás Avenida"
          width={180}
          height={180}
          className="rounded-full shadow-lg"
        />
      </motion.div>

      {/* Texto de boas-vindas */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold mt-6"
      >
        Bem-vindo à Gás Avenida
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-gray-400 text-center mt-2 mb-8"
      >
        Entrega rápida e segura de gás e água mineral.
      </motion.p>

      {/* Formulário de entrada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full max-w-sm bg-zinc-900 p-6 rounded-2xl shadow-lg border border-green-400"
      >
        <label className="block mb-3 text-sm text-gray-300">Seu nome</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-3 rounded-lg mb-5 bg-black border border-green-500 text-white focus:ring-2 focus:ring-green-400"
        />

        <label className="block mb-3 text-sm text-gray-300">Telefone</label>
        <input
          type="tel"
          placeholder="(XX) XXXXX-XXXX"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full p-3 rounded-lg mb-6 bg-black border border-green-500 text-white focus:ring-2 focus:ring-green-400"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinuar}
          className="w-full bg-green-500 text-black font-bold py-3 rounded-xl hover:bg-green-400 transition"
        >
          Continuar
        </motion.button>
      </motion.div>
    </div>
  );
}
