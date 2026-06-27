import './navbar.css';
import logo from '../../assets/hospedar.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Menu, X } from 'lucide-react';

const Navbar = () => {
const navigate = useNavigate();
const location = useLocation();

const { user, logout, isAuthenticated } = useAuth();

const [menuOpen, setMenuOpen] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const menuRef = useRef(null);

const isHome = location.pathname === '/';
const currentPath = location.pathname.toLowerCase();

const isPropertyRelated =
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

  {isPropertyRelated && (
    <ul className="navbar-links">
      <li onClick={() => navigate("/myBooking")}>
      Mis Reservas
    </li>
      <li onClick={() => navigate("/about")}>
      Nosotros
    </li>

      <li onClick={() => navigate("/help")}>
      Ayuda
    </li>
    </ul>
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
      <button
        className="btn-avatar"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        <User size={24} />
      </button>

      {menuOpen && (
        <div className="user-menu">
          <p className="text-sm">
            {user?.name ||
              user?.username ||
              'Usuario'}
          </p>

          <p className="text-xs">
            {user?.email}
          </p>

          <hr />

          <button
            onClick={() =>
              navigate('/profile')
            }
          >
            Perfil
          </button>

          <button
            onClick={() =>
              navigate('/settings')
            }
          >
            Configuración
          </button>

          <button
            onClick={() =>
              navigate('/help')
            }
          >
            Ayuda
          </button>

          <hr />

          <button onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
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

  {mobileMenuOpen && (
    <div className="mobile-menu">
      {isPropertyRelated && (
        <>
          <a href="#buscar">
            Buscar Hospedaje
          </a>

          <a href="#usuario">
            Usuario
          </a>

          <a href="#nosotros">
            Nosotros
          </a>
        </>
      )}

      {isHome &&
        !isAuthenticated && (
          <>
            <button
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
            >
              Login
            </button>

            <button
              onClick={() => {
                navigate('/register');
                setMobileMenuOpen(false);
              }}
            >
              Register
            </button>
          </>
        )}

      {isAuthenticated && (
        <>
          <div className="mobile-user-info">
            <strong>
              {user?.name ||
                user?.username ||
                'Usuario'}
            </strong>

            <small>
              {user?.email}
            </small>
          </div>

          <button
            onClick={() => {
              navigate('/profile');
              setMobileMenuOpen(false);
            }}
          >
            Perfil
          </button>

          <button
            onClick={() => {
              navigate('/settings');
              setMobileMenuOpen(false);
            }}
          >
            Configuración
          </button>

          <button
            onClick={() => {
              navigate('/help');
              setMobileMenuOpen(false);
            }}
          >
            Ayuda
          </button>

          <button
            onClick={() => {
              logout();
              setMobileMenuOpen(false);
            }}
          >
            Cerrar Sesión
          </button>
        </>
      )}
    </div>
  )}
</nav>

);
};

export default Navbar;
