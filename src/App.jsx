import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home.jsx";
import Register from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";
import { Toaster } from "sonner";
import PropertyPage from "./pages/propertyPage/PropertyPage.jsx";
import Navbar from "./components/navbar/navbar.jsx";





function App() {
  return (
    <>


    <Toaster
        position="top-right"
        richColors
        closeButton
      />


    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/profile" element={<ProfileSelectionModal />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/propertyPage" element={<PropertyPage />} />
      </Routes>
    </BrowserRouter>

    
      </>
  );
}

export default App;