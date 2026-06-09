import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home.jsx";
import ProfileSelectionModal from "./pages/login/previous.jsx";
import Register from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileSelectionModal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;