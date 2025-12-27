import { SiWorldhealthorganization } from "react-icons/si";
import { FiBox, FiMonitor, FiClipboard, FiShoppingCart, FiTruck } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function HeaderPDV() {
  const menuItems = [
    { name: "Caixa", icon: <FiBox className="text-xl" />, path: "/pdv" },
    { name: "Mesa", icon: <FiMonitor className="text-xl" />, path: "/mesa" },
    { name: "Comanda", icon: <FiClipboard className="text-xl" />, path: "/pdv/comanda" },
    { name: "Pedido", icon: <FiShoppingCart className="text-xl" />, path: "/pdv/pedido" },
    { name: "Delivery", icon: <FiTruck className="text-xl" />, path: "/pdv/delivery" },
  ];

  return (
    <header className="h-16 px-4 sm:px-6 lg:px-8 flex items-center mt-2">
      <div className="w-full h-full rounded-2xl bg-[#033153] shadow-2xl flex items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Menu à esquerda */}
        <nav className="flex gap-2 sm:gap-4 text-white font-medium overflow-x-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-2 rounded relative transition ${
                  isActive ? "text-white" : "text-white/80 hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="hidden sm:inline">{item.name}</span>
              </div>

              {/* Barra laranja centralizada embaixo do item ativo */}
              <span
                className="absolute bottom-0 left-1/2 w-10 h-1 bg-[#FF7E29] rounded-t transition-all"
                style={{
                  transform: "translateX(-50%)",
                  opacity: window.location.pathname === item.path ? 1 : 0,
                }}
              />
            </NavLink>
          ))}
        </nav>

        {/* Logo à direita */}
        <div className="flex items-center gap-2 text-white">
          <SiWorldhealthorganization className="text-3xl" />
          <span className="font-semibold hidden sm:inline">DataCaixaPDV</span>
        </div>

      </div>
    </header>
  );
}
