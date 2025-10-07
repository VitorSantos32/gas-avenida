'use client'
import { useRouter } from 'next/navigation'

export default function TipoPagamentoPage() {
  const router = useRouter()

  const selecionar = (tipo: string) => {
    localStorage.setItem('tipoPagamento', tipo)
    router.push('/pagamento')
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Escolha o tipo de pagamento</h2>

      <div className="flex flex-col gap-6">
        <button
          onClick={() => selecionar('entrega')}
          className="bg-green-500 text-black py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Pagar na Entrega
        </button>
        <button
          onClick={() => selecionar('antecipado')}
          className="bg-zinc-800 border border-green-500 py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Pagar Antecipado
        </button>
      </div>
    </div>
  )
}
