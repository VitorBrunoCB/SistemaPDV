import { useState } from "react";
import { FiUsers, FiUser, FiClock } from "react-icons/fi";

export default function Mesa() {
  const [mesas] = useState([
    { numero: "001", status: "Livre", vendedor: "João", cliente: "-", total: 0 },
    { numero: "002", status: "Livre", vendedor: "Maria", cliente: "-", total: 0 },
    { numero: "003", status: "Ocupada", vendedor: "Ana", cliente: "Carlos", total: 27.5 },
    { numero: "004", status: "Ocupada", vendedor: "Pedro", cliente: "Lucas", total: 21.7 },
    { numero: "005", status: "Livre", vendedor: "João", cliente: "-", total: 0 },
    { numero: "006", status: "Livre", vendedor: "Maria", cliente: "-", total: 0 },
    { numero: "007", status: "Reservada", vendedor: "-", cliente: "Gabriel", total: 0 },
    { numero: "008", status: "Reservada", vendedor: "-", cliente: "Gabriel", total: 0 },
    { numero: "009", status: "Reservada", vendedor: "-", cliente: "Gabriel", total: 0 },
  ]);

  const [filtro, setFiltro] = useState("Todas");

  const filtrarMesas = () => {
    if (filtro === "Todas") return mesas;
    return mesas.filter((m) => m.status === filtro);
  };

  const abrirDetalhesMesa = (numero) => {
    alert(`Abrir detalhes da mesa ${numero}`);
  };

  const getBg = (status) => {
    if (status === "Livre") return "bg-blue-600";
    if (status === "Ocupada") return "bg-red-600";
    if (status === "Fechamento") return "bg-green-600";
    if (status === "Reservada") return "bg-purple-600";
    return "bg-gray-500";
  };

  return (
    <div className="p-4 space-y-5">
      {/* ===== FILTROS ===== */}
      <div className="flex gap-3 flex-wrap">
        {["Todas", "Livre", "Ocupada", "Fechamento", "Reservada"].map((status) => (
          <button
            key={status}
            onClick={() => setFiltro(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition
              ${
                filtro === status
                  ? "bg-[#FF7E29] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ===== GRID DE MESAS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filtrarMesas().map((mesa) => (
          <div
            key={mesa.numero}
            onClick={() => abrirDetalhesMesa(mesa.numero)}
            className={`${getBg(
              mesa.status
            )} text-white rounded-xl p-4 cursor-pointer shadow-lg
              hover:scale-[1.03] transition-transform relative`}
          >
            {/* Número da mesa */}
            <div className="absolute top-2 right-3 text-sm font-bold opacity-80">
              #{mesa.numero}
            </div>

            {/* Ícone central */}
            <div className="flex justify-center my-4">
              <FiUsers className="text-5xl opacity-90" />
            </div>

            {/* Status */}
            <div className="text-center font-semibold mb-2">
              {mesa.status}
            </div>

            {/* Infos */}
            <div className="text-xs space-y-1 opacity-90">
              <div className="flex items-center gap-1">
                <FiUser />
                <span>{mesa.cliente}</span>
              </div>

              <div className="flex items-center gap-1">
                <FiClock />
                <span>Vendedor: {mesa.vendedor}</span>
              </div>
            </div>

            {/* Total */}
            <div className="mt-3 text-center font-bold text-sm">
              R$ {mesa.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
