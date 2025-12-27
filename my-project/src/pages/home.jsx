export default function Home() {
  const resumo = {
    vendasHoje: 18,
    faturamento: 1245.9,
    pedidosAtivos: 6,
    ticketMedio: 69.3,
    tempoMedioMesa: 48,
  };

  const mesasResumo = {
    livres: 8,
    ocupadas: 5,
    reservadas: 2,
  };

  const topProdutosSemana = [
    { nome: "Pizza", qtd: 210 },
    { nome: "Hambúrguer", qtd: 165 },
    { nome: "Refrigerante", qtd: 140 },
    { nome: "Coxinha", qtd: 110 },
    { nome: "Batata frita", qtd: 95 },
  ];

  const alimentosPorDia = [
    { dia: "Seg", alimento: "Hambúrguer", qtd: 40 },
    { dia: "Ter", alimento: "Pizza", qtd: 30 },
    { dia: "Qua", alimento: "Coxinha", qtd: 50 },
    { dia: "Qui", alimento: "Hambúrguer", qtd: 25 },
    { dia: "Sex", alimento: "Pizza", qtd: 60 },
    { dia: "Sáb", alimento: "Refrigerante", qtd: 45 },
    { dia: "Dom", alimento: "Pizza", qtd: 70 },
  ];

  const maxQtd = Math.max(...alimentosPorDia.map((i) => i.qtd));

  const corAlimento = (nome) => {
    if (nome === "Pizza") return "from-red-500 via-pink-500 to-rose-400";
    if (nome === "Hambúrguer")
      return "from-amber-600 via-orange-500 to-yellow-400";
    if (nome === "Coxinha")
      return "from-yellow-500 via-lime-400 to-green-400";
    if (nome === "Refrigerante")
      return "from-blue-600 via-cyan-500 to-sky-400";
    return "from-gray-500 to-gray-400";
  };

  return (
    <div className="p-6 space-y-6 text-black">
      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Vendas hoje",
            valor: resumo.vendasHoje,
            cor: "from-emerald-500 to-green-400",
          },
          {
            label: "Faturamento",
            valor: `R$ ${resumo.faturamento.toFixed(2)}`,
            cor: "from-blue-500 to-sky-400",
          },
          {
            label: "Ticket médio",
            valor: `R$ ${resumo.ticketMedio.toFixed(2)}`,
            cor: "from-violet-500 to-purple-400",
          },
          {
            label: "Pedidos ativos",
            valor: resumo.pedidosAtivos,
            cor: "from-amber-500 to-orange-400",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="relative overflow-hidden rounded-2xl p-5 shadow bg-white"
          >
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.cor}`}
            />
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold text-gray-800">{item.valor}</p>
          </div>
        ))}
      </div>

      {/* RESUMOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3 text-emerald-800">
            Status das mesas
          </h3>
          <p className="text-sm text-emerald-900">
            🟢 {mesasResumo.livres} Livres | 🔴 {mesasResumo.ocupadas} Ocupadas |
            🟣 {mesasResumo.reservadas} Reservadas
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3 text-blue-800">
            Tempo médio por mesa
          </h3>
          <p className="text-2xl font-bold text-blue-900">
            {resumo.tempoMedioMesa} min
          </p>
        </div>

        <div className="bg-amber-50 rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3 text-amber-800">
            Horário de pico
          </h3>
          <p className="text-lg font-semibold text-amber-900">19h – 21h</p>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FATURAMENTO */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="font-semibold mb-3 text-indigo-700">
            Faturamento mensal
          </h2>
          <div className="flex items-end justify-between h-28 gap-3">
            {[40, 60, 30, 80, 50, 90].map((v, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 via-violet-500 to-purple-400"
                  style={{ height: `${v}%` }}
                />
                <span className="text-[11px] mt-1 text-gray-600">
                  {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ALIMENTO POR DIA */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h2 className="font-semibold mb-3 text-pink-700">
            Alimento mais pedido por dia
          </h2>
          <div className="flex items-end justify-between h-28 gap-3">
            {alimentosPorDia.map((item) => {
              const altura = (item.qtd / maxQtd) * 100;
              return (
                <div
                  key={item.dia}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className={`w-full rounded-t-lg bg-gradient-to-t ${corAlimento(
                      item.alimento
                    )}`}
                    style={{ height: `${altura}%` }}
                  />
                  <span className="text-[11px] mt-1 text-gray-600">
                    {item.dia}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TOP 5 */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-5 py-3 border-b bg-[#033153]">
          <h3 className="font-semibold text-white">
            Top 5 alimentos da semana
          </h3>
        </div>

        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-sm font-medium">Posição</th>
                <th className="px-4 py-2 text-sm font-medium">Produto</th>
                <th className="px-4 py-2 text-sm font-medium text-right">
                  Pedidos
                </th>
              </tr>
            </thead>

            <tbody>
              {topProdutosSemana.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition"
                >
                  <td className="px-4 py-2 font-semibold">{index + 1}º</td>
                  <td className="px-4 py-2">{item.nome}</td>
                  <td className="px-4 py-2 text-right font-medium">
                    {item.qtd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
