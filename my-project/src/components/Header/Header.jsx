import { SiWorldhealthorganization } from "react-icons/si";

export default function Header() {
  return (
    <header className="h-16 px-6 flex items-center mt-4">
      <div className="w-full h-full rounded-2xl bg-[#033153] shadow-2xl flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-white">
          <SiWorldhealthorganization className="text-3xl" />
          <span className="font-semibold">DataCaixaaaaaaaaaaaaaaa</span>
        </div>

        <nav className="flex gap-4 text-white font-medium">
          <button>Opção 1</button>
          <button>Opção 2</button>
          <button>Opção 3</button>
        </nav>
      </div>
    </header>
  );
}
