import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import HeaderPDV from "../components/Header/HeaderPDV";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const location = useLocation();

  const PDV_PAGES = ["/pdv", "/mesa"];
  const useHeaderPDV = PDV_PAGES.includes(location.pathname);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-gray-100">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
        className="flex flex-col transition-all duration-300"
      >
        {/* HEADER */}
        {useHeaderPDV ? <HeaderPDV /> : <Header collapsed={collapsed} />}

        {/* CONTEÚDO */}
        <main className="pt-4 px-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
