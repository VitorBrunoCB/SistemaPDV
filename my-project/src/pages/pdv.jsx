import { useState } from "react";
import { FiTrash2, FiEdit2, FiCheckCircle } from "react-icons/fi";
import HeaderPDV from "../components/Header/HeaderPDV"; // Header específico PDV

export default function Pdv() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Feijão 1kg", codigo: "002", quantidade: 2, valor: 16 },
    { id: 2, nome: "Arroz 5kg", codigo: "001", quantidade: 1, valor: 25 },
    { id: 3, nome: "Arroz 5kg", codigo: "001", quantidade: 1, valor: 25 },
  ]);

  const [editQtdId, setEditQtdId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuantidadeChange = (id, novaQtd) => {
    const qtd = Math.max(1, Math.min(99, novaQtd));
    setProdutos((prev) => prev.map((p) => (p.id === id ? { ...p, quantidade: qtd } : p)));
  };

  const handleDelete = (id) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFinalizarVenda = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1400);
  };

  const handleCancelarVenda = () => {
    setProdutos([]);
  };

  return (
    <div>
      {/* Conteúdo da página, mais próximo do header */}
      <div className="p-4 sm:p-4 lg:p-6 space-y-6 relative">
        
        {/* ===== BARRA DE ATALHOS ===== */}
        <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap ml-3 text-3xl">
          {[
            "F1 Menu Principal",
            "F2 Abertura de Caixa",
            "F3 Identificação do Cliente",
            "F4 Cancel. de Item",
            "F5 Cancel. de Venda",
            "F6 Desc. Acréscimo",
            "F7 Menu Fiscal",
            "F8 Fechamento de Caixa",
          ].map((label) => (
            <button
              key={label}
              className="bg-[#FF7E29] text-[#033153] text-2xl font-extrabold
              p-2 px-8 rounded-lg hover:opacity-90 transition text-center cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        {/* ===== CONTEÚDO PRINCIPAL ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* ===== TABELA DE PRODUTOS ===== */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 flex flex-col">
            <h2 className="text-lg font-semibold text-black mb-3">Produtos no Caixa</h2>

            <div className="overflow-x-auto rounded-2xl shadow-inner bg-gray-50">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    {["Cód","Produto","Quantidade","Valor","Total","Ações"].map(header => (
                      <th key={header} className="px-4 py-2 text-black text-sm font-medium opacity-80">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((p,index) => (
                    <tr key={p.id} className={`${index % 2===0 ? "bg-white" : "bg-gray-100"} hover:bg-gray-200 transition text-3xl cursor-default`}>
                      <td className="px-4 py-2 text-black">{p.codigo}</td>
                      <td className="px-4 py-2 text-black">{p.nome}</td>
                      <td className="px-4 py-2 text-black">
                        {editQtdId === p.id ? (
                          <input
                            type="number"
                            value={p.quantidade}
                            onChange={(e) => handleQuantidadeChange(p.id, parseInt(e.target.value) || 1)}
                            onBlur={() => setEditQtdId(null)}
                            className="w-12 border rounded px-1 text-black"
                            autoFocus
                            min={1}
                            max={99}
                          />
                        ) : (
                          <span className="cursor-pointer font-semibold" onClick={() => setEditQtdId(p.id)}>
                            {p.quantidade}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-black">R$ {p.valor.toFixed(2)}</td>
                      <td className="px-4 py-2 text-black">R$ {(p.valor * p.quantidade).toFixed(2)}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button onClick={() => setEditQtdId(p.id)} className="p-2 rounded cursor-pointer">
                          <FiEdit2 className="w-5 h-5 text-[#033153]" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 rounded cursor-pointer">
                          <FiTrash2 className="w-5 h-5 text-[#FF7E29]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== RESUMO / PRODUTO ATUAL ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between text-3xl">
            <div>
              <h2 className="text-md font-semibold text-black mb-3">Produto Atual</h2>
              <div className="w-full h-44 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">Imagem do Produto</div>
              <div className="mt-3 text-md text-black space-y-1">
                <p className="font-semibold">{produtos[0]?.nome || "—"}</p>
                <p>Código: {produtos[0]?.codigo || "—"}</p>
                <p>Quantidade: {produtos[0]?.quantidade || 0}</p>
                <p>Valor: R$ {produtos[0]?.valor || 0}</p>
              </div>
            </div>

            <div className="mt-4 border-t pt-3 text-md">
              <div className="flex justify-between text-sm text-black">
                <span>Subtotal</span>
                <span>R${produtos.reduce((acc,p)=>acc+p.valor*p.quantidade,0).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-md font-semibold text-black mt-1">
                <span>Total</span>
                <span>R${produtos.reduce((acc,p)=>acc+p.valor*p.quantidade,0).toFixed(2)}</span>
              </div>

              <div className="flex gap-3 mt-3">
                <button className="flex-1 bg-[#FF7E29] text-[#011727] py-2 rounded-xl font-semibold hover:opacity-90 cursor-pointer" onClick={handleCancelarVenda}>Cancelar</button>
                <button className="flex-1 bg-[#033153] text-white py-2 rounded-xl font-semibold hover:opacity-90 cursor-pointer" onClick={handleFinalizarVenda}>Finalizar Venda</button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MODAL DE SUCESSO ===== */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-lg px-12 py-8 flex flex-col items-center gap-4 text-center">
              <FiCheckCircle className="w-16 h-16 text-green-600" />
              <span className="text-2xl font-bold text-black">Venda Concluída!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
