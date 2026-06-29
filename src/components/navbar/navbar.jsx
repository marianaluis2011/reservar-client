import './navbar.css';
import logo from '../../assets/hospedar.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Menu, X } from 'lucide-react';
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
const navigate = useNavigate();
const location = useLocation();

const { user, logout, isAuthenticated } = useAuth();

const [menuOpen, setMenuOpen] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const menuRef = useRef(null);

const isHome = location.pathname === '/';
const currentPath = location.pathname.toLowerCase();

const showNavigationLinks =
  isHome ||
  currentPath.includes('property') ||
  currentPath.includes('booking') ||
  currentPath.includes('help') ||
  currentPath.includes('about') ||
  currentPath.includes('room');

useEffect(() => {
const handleClickOutside = (event) => {
if (
menuRef.current &&
!menuRef.current.contains(event.target)
) {
setMenuOpen(false);
}
};

document.addEventListener(
  'mousedown',
  handleClickOutside
);

return () => {
  document.removeEventListener(
    'mousedown',
    handleClickOutside
  );
};

}, []);

return ( <nav className="navbar">
<div
className="navbar-logo-container"
onClick={() => navigate('/')}
> <img
       src={logo}
       alt="Hospedar Logo"
       className="navbar-logo-img"
     />

    <span className="navbar-brand-name">
      Hospedar
    </span>
  </div>

  {showNavigationLinks && (
  <NavLinks navigate={navigate} />
)}

  {isHome && !isAuthenticated && (
    <div className="navbar-actions">
      <button
        className="btn-login"
        onClick={() => navigate('/login')}
      >
        Iniciar Sesión
      </button>

      <button
        className="btn-register"
        onClick={() => navigate('/register')}
      >
        Registrarse
      </button>
    </div>
  )}

  {isAuthenticated && (
    <div
      className="navbar-actions"
      ref={menuRef}
    >
      {(user?.role === "host" || user?.role === "super_admin") && (
        <button
          className="btn-panel"
          onClick={() =>
            navigate(user.role === "super_admin" ? "/host/superAdmin" : "/host/dashboard")
          }
        >
          Mi panel
        </button>
      )}

      {user?.role === "guest" && (
        <button
          className="btn-panel"
          onClick={() => navigate("/myBooking")}
        >
          Mis reservas
        </button>
      )}

      <button
        className="btn-avatar"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        <User size={24} />
      </button>

    {menuOpen && (
  <UserMenu
    user={user}
    navigate={navigate}
    logout={logout}
    closeMenu={() => setMenuOpen(false)}
  />
)}
    </div>
  )}

  <button
    className="mobile-menu-btn"
    onClick={() =>
      setMobileMenuOpen(
        !mobileMenuOpen
      )
    }
  >
    {mobileMenuOpen ? (
      <X size={28} />
    ) : (
      <Menu size={28} />
    )}
  </button>

<MobileMenu
  open={mobileMenuOpen}
  showNavigationLinks={showNavigationLinks}
  isHome={isHome}
  isAuthenticated={isAuthenticated}
  user={user}
  navigate={navigate}
  logout={logout}
  closeMenu={() => setMobileMenuOpen(false)}
/>
</nav>

);
};

export default Navbar;
