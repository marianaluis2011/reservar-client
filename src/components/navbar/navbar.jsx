import './navbar.css';
import logo from '../../assets/hospedar.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { User } from 'lucide-react'; // ✅ icono de usuario

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === '/';
  const currentPath = location.pathname.toLowerCase();
  const isPropertyRelated = currentPath.includes('property') || currentPath.includes('room');

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
        <div className="navbar-actions relative">
          {/* Botón con icono */}
          <button 
            className="btn-user" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <User size={22} />
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="user-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3">
              <p className="text-sm font-semibold text-slate-700">
                {user?.name || user?.username || "Usuario"}
              </p>
              <p className="text-xs text-slate-500">{user?.email}</p>
              <hr className="my-2" />
              <button 
                className="w-full text-left text-red-600 hover:text-red-800 text-sm"
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
