import { useState, useRef, useEffect } from "react";
import { SiWorldhealthorganization } from "react-icons/si";
import { MdNotificationsNone } from "react-icons/md";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notificacoes = [
    { id: 1, texto: "3 mesas aguardando fechamento", tipo: "warning" },
    { id: 2, texto: "Estoque baixo: Refrigerante", tipo: "danger" },
    { id: 3, texto: "1 conta aberta há mais de 2h", tipo: "info" },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 px-4 sm:px-6 lg:px-8 flex items-center mt-6">
      <div className="w-full h-full rounded-2xl bg-[#033153] shadow-2xl flex items-center justify-between px-6 relative">

        {/* FRASE À ESQUERDA */}
        <div className="text-white font-medium text-sm sm:text-base">
          👋 Seja bem-vindo ao <span className="font-semibold">DataCaixa</span>
        </div>

        {/* DIREITA */}
        <div className="flex items-center gap-6">

          {/* NOTIFICAÇÕES */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="relative text-white text-2xl hover:text-amber-400 transition"
            >
              <MdNotificationsNone />

              {notificacoes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {notificacoes.length}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                <div className="px-4 py-3 border-b">
                  <h3 className="font-semibold text-gray-800">
                    Notificações
                  </h3>
                </div>

                <div className="max-h-72 overflow-y-auto">
                  {notificacoes.map((n) => (
                    <div
                      key={n.id}
                      className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition"
                    >
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full text-white text-sm
                          ${n.tipo === "danger" && "bg-red-500"}
                          ${n.tipo === "warning" && "bg-amber-500"}
                          ${n.tipo === "info" && "bg-blue-500"}
                        `}
                      >
                        !
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-800">
                          {n.texto}
                        </p>
                        <span className="text-xs text-gray-500">
                          agora mesmo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t text-center text-sm text-blue-600 hover:bg-gray-50 cursor-pointer">
                  Ver todas
                </div>
              </div>
            )}
          </div>

          {/* LOGO */}
          <div className="flex items-center gap-2 text-white">
            <SiWorldhealthorganization className="text-3xl" />
            <span className="font-semibold hidden sm:inline">
              DataCaixaPDV
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
