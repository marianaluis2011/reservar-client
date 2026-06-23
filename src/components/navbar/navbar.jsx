import './navbar.css';
import logo from '../../assets/hospedar.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout, isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isHome = location.pathname === '/';
  const currentPath = location.pathname.toLowerCase();
  const isPropertyRelated =
    currentPath.includes('property') ||
    currentPath.includes('room');

  // cerrar menú al click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  return (
    <nav className="navbar">

      <div
        className="navbar-logo-container"
        onClick={() => navigate('/')}
      >
        <img
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
          <li><a href="#buscar">Buscar Hospedaje</a></li>
          <li><a href="#usuario">Usuario</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
        </ul>
      )}

      {isHome && !isAuthenticated && (
        <div className="navbar-actions">
          <button
            className="btn-login"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <button
            className="btn-register"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      )}

      {isAuthenticated && (
        <div
          className="navbar-actions relative"
          ref={menuRef}
        >
          <button
            className="btn-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <User size={24} />
          </button>

          {menuOpen && (
            <div className="user-menu">
              <p className="text-sm font-semibold">
                {user?.name || user?.username || "Usuario"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email}
              </p>

              <hr />

              <button
                onClick={() => navigate('/profile')}
              >
                Perfil
              </button>

              <button
                onClick={() => navigate('/settings')}
              >
                Configuración
              </button>

              <button
                onClick={() => navigate('/help')}
              >
                Ayuda
              </button>

              <hr />

              <button onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;