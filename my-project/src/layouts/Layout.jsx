import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import HeaderPDV from "../components/Header/HeaderPDV";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const location = useLocation(); // pega a rota atual

  // Se estiver na página /pdv, usa apenas HeaderPDV
  const isPDV = location.pathname === "/pdv";

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
        className="flex flex-col transition-all duration-300"
      >
        {/* Header: apenas HeaderPDV na página /pdv */}
        {isPDV ? <HeaderPDV /> : <Header collapsed={collapsed} />}

        <main className="pt-20 px-6 w-full h-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
