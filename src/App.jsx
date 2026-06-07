import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home.jsx";
import ProfileSelectionModal from "./pages/login/login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<ProfileSelectionModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;