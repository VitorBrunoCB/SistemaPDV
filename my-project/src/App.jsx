import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/home";
import Pdv from "./pages/pdv";
import Cardapio from "./pages/cardapio";
import Mesa from "./pages/mesa";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pdv" element={<Pdv />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/mesa" element={<Mesa />} />
      </Route>
    </Routes>
  );
}

export default App;
