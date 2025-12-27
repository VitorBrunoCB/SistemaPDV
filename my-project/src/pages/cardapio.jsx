import { useState } from "react";
import { FiEdit, FiArrowUp, FiArrowDown, FiPlus } from "react-icons/fi";

export default function Cardapio() {
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");
  const [editQtdId, setEditQtdId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [itens, setItens] = useState([
    { id: 1, codigo: "001", produto: "Feijão", nome: "Feijão 1kg", quantidade: 5, valor: 16, status: "Com estoque", categoria: "Grãos" },
    { id: 2, codigo: "002", produto: "Arroz", nome: "Arroz 5kg", quantidade: 3, valor: 25, status: "Com estoque", categoria: "Grãos" },
    { id: 3, codigo: "003", produto: "Açúcar", nome: "Açúcar 1kg", quantidade: 0, valor: 8, status: "Sem estoque", categoria: "Açúcares" },
    { id: 4, codigo: "004", produto: "Leite", nome: "Leite 1L", quantidade: 12, valor: 6, status: "Com estoque", categoria: "Laticínios" },
  ]);

  const [newItem, setNewItem] = useState({
    nome: "",
    valor: "",
    quantidade: "",
    categoria: "",
  });

  const statusClasses = {
    "Com estoque": "bg-green-500/20 text-green-600",
    "Sem estoque": "bg-red-500/20 text-red-700",
  };

  const filteredItens = itens
    .filter(
      (item) =>
        item.produto.toLowerCase().includes(search.toLowerCase()) ||
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.codigo.includes(search)
    )
    .sort((a, b) => (sortAsc ? a.valor - b.valor : b.valor - a.valor));

  const handleQuantidadeChange = (id, novaQtd) => {
    const qtd = Math.max(0, Math.min(99, novaQtd));
    setItens(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantidade: qtd, status: qtd > 0 ? "Com estoque" : "Sem estoque" }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setItens(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    // Validação: todos os campos obrigatórios
    if (!newItem.nome || !newItem.valor || newItem.quantidade === "" || !newItem.categoria) {
      return; // Não adiciona
    }

    const nextId = itens.length ? itens[itens.length - 1].id + 1 : 1;
    const codigo = String(nextId).padStart(3, "0");
    const quantidade = parseInt(newItem.quantidade) || 0;
    const status = quantidade > 0 ? "Com estoque" : "Sem estoque";
    const produto = newItem.nome.split(" ")[0] || newItem.nome;

    setItens(prev => [
      ...prev,
      {
        id: nextId,
        codigo,
        produto,
        nome: newItem.nome,
        quantidade,
        valor: parseFloat(newItem.valor) || 0,
        status,
        categoria: newItem.categoria,
      },
    ]);

    setNewItem({ nome: "", valor: "", quantidade: "", categoria: "" });
    setShowModal(false);
  };

  const handleCancel = () => {
    setNewItem({ nome: "", valor: "", quantidade: "", categoria: "" });
    setShowModal(false);
  };

  return (
    <div className="ml-4 p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-6">Cardápio</h1>

      {/* Barra de pesquisa, ordenação e adicionar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Pesquisar...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-black w-72"
        />

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg shadow hover:bg-gray-200 text-black font-medium transition"
        >
          {sortAsc ? <FiArrowUp /> : <FiArrowDown />}
          {sortAsc ? "Menor → Maior" : "Maior → Menor"}
        </button>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <FiPlus /> Adicionar Item
        </button>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-100 rounded-t-2xl">
            <tr>
              {["Cód", "Produto", "Nome", "Categoria", "Quantidade", "Valor", "Status", "Ações"].map(header => (
                <th key={header} className="px-4 py-3 text-black text-sm font-medium opacity-80">
                  <div className="flex items-center justify-between gap-2">
                    {header}
                    <FiArrowUp className="h-4 w-4 opacity-50" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {filteredItens.map((item, index) => (
              <tr key={item.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} hover:bg-gray-200 transition`}>
                <td className="px-4 py-2 text-black">{item.codigo}</td>
                <td className="px-4 py-2 text-black">{item.produto}</td>
                <td className="px-4 py-2 text-black">{item.nome}</td>
                <td className="px-4 py-2 text-black">{item.categoria}</td>
                <td className="px-4 py-2 text-black">
                  {editQtdId === item.id ? (
                    <input
                      type="number"
                      value={item.quantidade}
                      onChange={(e) => handleQuantidadeChange(item.id, parseInt(e.target.value) || 0)}
                      onBlur={() => setEditQtdId(null)}
                      className="w-12 border rounded px-1 text-black"
                      autoFocus
                      min={0}
                      max={99}
                    />
                  ) : (
                    <span className="cursor-pointer font-semibold" onClick={() => setEditQtdId(item.id)}>
                      {item.quantidade}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-black">R$ {item.valor}</td>
                <td className="px-4 py-2">
                  <div className={`w-max font-bold uppercase text-xs py-1 px-2 rounded-md ${statusClasses[item.status]}`}>
                    {item.status}
                  </div>
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => setEditQtdId(item.id)} className="p-2 rounded hover:bg-gray-200 flex items-center justify-center">
                    <FiEdit className="w-5 h-5 text-blue-600" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded hover:bg-gray-200 flex items-center justify-center">
                    <FiEdit className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tailwind */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Adicionar Produto</h2>
            <input
              type="text"
              placeholder="Nome do produto"
              className="w-full mb-2 px-3 py-2 border rounded text-black"
              value={newItem.nome}
              onChange={e => setNewItem({ ...newItem, nome: e.target.value })}
            />
            <input
              type="number"
              placeholder="Quantidade"
              className="w-full mb-2 px-3 py-2 border rounded text-black"
              value={newItem.quantidade}
              onChange={e => setNewItem({ ...newItem, quantidade: e.target.value })}
            />
            <input
              type="number"
              placeholder="Valor"
              className="w-full mb-2 px-3 py-2 border rounded text-black"
              value={newItem.valor}
              onChange={e => setNewItem({ ...newItem, valor: e.target.value })}
            />
            <input
              type="text"
              placeholder="Categoria"
              className="w-full mb-4 px-3 py-2 border rounded text-black"
              value={newItem.categoria}
              onChange={e => setNewItem({ ...newItem, categoria: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleCancel} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                Cancelar
              </button>
              <button onClick={handleAddItem} className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
