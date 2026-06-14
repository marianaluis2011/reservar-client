import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home.jsx";
import Register from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";
import { Toaster } from "sonner";
import PropertyPage from "./pages/propertyPage/PropertyPage.jsx";
import RoomDetail from "./pages/roomDetail/RoomDetail.jsx";
import Navbar from "./components/navbar.jsx"





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
        <Route path="/roomDetail" element={<RoomDetail />} />
      </Routes>
    </BrowserRouter>

    
      </>
  );
}

export default App;