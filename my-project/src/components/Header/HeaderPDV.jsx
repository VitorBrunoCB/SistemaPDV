import { useState, useRef, useEffect } from "react";
import { SiWorldhealthorganization } from "react-icons/si";
import {
  FiBox,
  FiMonitor,
  FiClipboard,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";
import { MdNotificationsNone } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

export default function HeaderPDV() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    { name: "Caixa", icon: <FiBox className="text-xl" />, path: "/pdv" },
    { name: "Mesa", icon: <FiMonitor className="text-xl" />, path: "/mesa" },
    { name: "Comanda", icon: <FiClipboard className="text-xl" />, path: "/pdv/comanda" },
    { name: "Pedido", icon: <FiShoppingCart className="text-xl" />, path: "/pdv/pedido" },
    { name: "Delivery", icon: <FiTruck className="text-xl" />, path: "/pdv/delivery" },
  ];

  const notificacoes = [
    { id: 1, texto: "3 mesas aguardando fechamento", tipo: "warning" },
    { id: 2, texto: "Estoque baixo: Refrigerante", tipo: "danger" },
    { id: 3, texto: "1 conta aberta há mais de 2h", tipo: "info" },
  ];

  // FECHAR AO CLICAR FORA
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
      <div className="w-full h-full rounded-2xl bg-[#033153] shadow-2xl flex items-center justify-between px-6">

        {/* MENU */}
        <nav className="flex gap-2 sm:gap-4 text-white font-medium overflow-x-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded relative transition ${
                  isActive
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="hidden sm:inline">{item.name}</span>
                </div>

                {/* INDICADOR ATIVO */}
                <span
                  className={`absolute bottom-0 left-1/2 w-10 h-1 bg-[#FF7E29] rounded-t transition-all ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transform: "translateX(-50%)" }}
                />
              </NavLink>
            );
          })}
        </nav>

        {/* AÇÕES À DIREITA */}
        <div className="flex items-center gap-5 text-white">

          {/* NOTIFICAÇÕES */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="relative text-2xl hover:text-amber-400 transition"
            >
              <MdNotificationsNone />

              {/* BADGE */}
              {notificacoes.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {notificacoes.length}
                </span>
              )}
            </button>

            {/* DROPDOWN */}
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
          <div className="flex items-center gap-2">
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
