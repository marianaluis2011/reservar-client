import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import FooterB from "../components/footer/FooterB";
import ProtectedRoute from "../context/ProtectedRoute";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import PropertyPage from "../pages/propertyPage/PropertyPage";
import RoomDetail from "../pages/roomDetail/RoomDetail";
import HostDashboard from "../pages/panelAdm/HostDashboard";
import SuperAdminDashboard from "../pages/superAdminDashboard/SuperAdminDashboard";
import About from "../pages/about/About";
import Error404 from "../pages/error/error";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/propertyPage" element={<PropertyPage />} />
        <Route path="/roomDetail" element={<RoomDetail />} />
        <Route path="/about" element={<About />} />

        {/* Privadas */}
<Route element={<ProtectedRoute allowedRoles={["host"]} />}>
  <Route path="/host/dashboard" element={<HostDashboard />} />
</Route>

<Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
  <Route path="/host/superAdmin" element={<SuperAdminDashboard />} />
</Route>

        {/* Error */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      <FooterB />
    </BrowserRouter>
  );
}