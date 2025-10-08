"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";

export default function PedidoPage() {
  const router = useRouter();

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Botijão de Gás 13kg",
      preco: 120,
      imagem: "/gas.png",
      quantidade: 0,
    },
    {
      id: 2,
      nome: "Água 20L",
      preco: 12,
      imagem: "/agua.png",
      quantidade: 0,
    },
  ]);

  const adicionar = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
      )
    );
  };

  const remover = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id && p.quantidade > 0
          ? { ...p, quantidade: p.quantidade - 1 }
          : p
      )
    );
  };

  const total = produtos.reduce(
    (soma, p) => soma + p.quantidade * p.preco,
    0
  );

  const irParaEndereco = () => {
    if (total > 0) {
      localStorage.setItem("pedido", JSON.stringify(produtos));
      router.push("/endereco");
    } else {
      alert("Selecione pelo menos um produto antes de continuar!");
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className={styles.title}>Escolha seus produtos</h1>

      <div className={styles.produtoContainer}>
        {produtos.map((p) => (
          <motion.div
            key={p.id}
            className={styles.produto}
            whileHover={{ scale: 1.05 }}
          >
            <div className={styles.produtoInfo}>
              <Image
                src={p.imagem}
                alt={p.nome}
                width={60}
                height={60}
                style={{ borderRadius: "8px" }}
              />
              <span className={styles.produtoNome}>{p.nome}</span>
              <span className={styles.produtoPreco}>R$ {p.preco.toFixed(2)}</span>
            </div>

            <div className={styles.contador}>
              <button
                onClick={() => remover(p.id)}
                className={styles.botao}
              >
                -
              </button>
              <span>{p.quantidade}</span>
              <button
                onClick={() => adicionar(p.id)}
                className={styles.botao}
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className={styles.total}>Total: R$ {total.toFixed(2)}</h2>

      <button onClick={irParaEndereco} className={styles.botaoPrincipal}>
        Continuar
      </button>
    </motion.div>
  );
}
