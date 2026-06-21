import './navbar.css';
import logo from '../../assets/hospedar.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User } from 'lucide-react'; // icono de usuario

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isHome = location.pathname === '/';
  const currentPath = location.pathname.toLowerCase();
  const isPropertyRelated = currentPath.includes('property') || currentPath.includes('room');

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo-container" onClick={() => navigate('/')}>
        <img 
          src={logo} 
          alt="Hospedar Logo" 
          className="navbar-logo-img" 
        />
        <span className="navbar-brand-name">Hospedar</span>
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
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-register" onClick={() => navigate('/register')}>Register</button>
        </div>
      )}

      {isAuthenticated && (
        <div className="navbar-actions relative" ref={menuRef}>
          {/* Botón avatar con icono */}
          <button 
            className="btn-avatar"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <User size={24} />
          </button>

          {/* Menú desplegable elegante */}
          {menuOpen && (
            <div 
              className="user-menu absolute right-0 top-full mt-2 w-56 bg-slate-800 text-white shadow-2xl rounded-lg p-4"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <p className="text-sm font-semibold">
                {user?.name || user?.username || "Usuario"}
              </p>
              <p className="text-xs text-slate-400">{user?.email}</p>
              <hr className="my-2 border-slate-600" />

              {/* Opciones extra */}
              <button 
                className="menu-item"
                onClick={() => navigate('/profile')}
              >
                Perfil
              </button>
              <button 
                className="menu-item"
                onClick={() => navigate('/settings')}
              >
                Configuración
              </button>
              <button 
                className="menu-item"
                onClick={() => navigate('/help')}
              >
                Ayuda
              </button>

              <hr className="my-2 border-slate-600" />
              <button 
                className="menu-item logout"
                onClick={logout}
              >
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
