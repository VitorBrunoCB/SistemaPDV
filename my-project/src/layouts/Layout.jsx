import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import HeaderPDV from "../components/Header/HeaderPDV";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const location = useLocation();

  // Páginas que usam HeaderPDV
  const PDV_PAGES = ["/pdv", "/mesa"];

  const useHeaderPDV = PDV_PAGES.includes(location.pathname);

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
        className="flex flex-col transition-all duration-300"
      >
        {/* Header único e correto */}
        {useHeaderPDV ? <HeaderPDV /> : <Header collapsed={collapsed} />}

        <main className="pt-16 px-6 w-full h-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
