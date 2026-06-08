import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home.jsx";
import ProfileSelectionModal from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<ProfileSelectionModal />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;