import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Pdv from "./pages/pdv";
import Cardapio from "./pages/cardapio";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pdv" element={<Pdv />} />
        <Route path="/cardapio" element={<Cardapio />} />
      </Route>
    </Routes>
  );
}

export default App;
