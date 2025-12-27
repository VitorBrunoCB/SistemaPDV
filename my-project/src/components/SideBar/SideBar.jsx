import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiSettings,
  FiCoffee,
  FiDollarSign,
  FiFileText,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";

function SideBar({ collapsed, setCollapsed }) {
  const menuManage = [
    { label: "Home", icon: <FiHome />, path: "/" },
    { label: "Cardápio Digital", icon: <FiCoffee />, path: "/cardapio" },
    { label: "Faturamento", icon: <FiDollarSign />, path: "/faturamento" },
    { label: "PDV", icon: <FiShoppingCart />, path: "/pdv" },
    { label: "NF-E", icon: <FiFileText />, path: "/nfe" },
  ];

  const menuSettings = [
    { label: "Configurações", icon: <FiSettings />, path: "/configuracoes" },
    { label: "Trocar conta", icon: <FiLogOut />, path: "/trocar-conta" },
  ];

  const MenuItem = ({ icon, label, path }) => (
    <NavLink to={path}>
      {({ isActive }) => (
        <div
          className={`
            group relative flex items-center gap-x-3 px-3 py-2 rounded-lg
            transition-all ${collapsed ? "justify-center" : ""}
            ${isActive ? "text-white" : "text-white/80 hover:text-white"}
          `}
        >
          {/* traço laranja */}
          <span
            className={`
              absolute left-0 top-2 bottom-2 w-1 bg-[#FF7E29] rounded-r
              transition-opacity
              ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
            `}
          />

          <span className="text-lg">{icon}</span>
          {!collapsed && label}
        </div>
      )}
    </NavLink>
  );

  return (
    <aside
      className={`
        h-full bg-[#033153] shadow-2xl
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="h-full px-4 py-6 flex flex-col text-white relative">

        {/* botão recolher */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-6 w-8 h-8
          rounded-full bg-[#033153] shadow
          flex items-center justify-center text-xl"
        >
          {collapsed ? "›" : "‹"}
        </button>

        {/* perfil */}
        <div className="flex items-center gap-x-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          {!collapsed && (
            <div>
              <p className="font-semibold">Mix Restaurante</p>
              <p className="text-sm text-white/70">contato@mix.com</p>
            </div>
          )}
        </div>

        {/* funções */}
        <div>
          {!collapsed && (
            <p className="text-xs text-white/60 mb-2">Funções</p>
          )}
          <ul className="flex flex-col gap-y-1">
            {menuManage.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </ul>
        </div>

        {/* configurações */}
        <div className="mt-auto">
          {!collapsed && (
            <p className="text-xs text-white/60 mb-2">Configurações</p>
          )}
          <ul className="flex flex-col gap-y-1">
            {menuSettings.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </ul>
        </div>

      </div>
    </aside>
  );
}

export default SideBar;
