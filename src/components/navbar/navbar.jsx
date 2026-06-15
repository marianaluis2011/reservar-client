// import React from 'react';
import './navbar.css';
import logo from '../../assets/hospedar.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isProperty = location.pathname === '/propertyPage';

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

      {isProperty && (
        <ul className="navbar-links">
          <li><a href="#buscar">Buscar Hospedaje</a></li>
          <li><a href="#usuario">Usuario</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
        </ul>
      )}

      {isHome && (
        <div className="navbar-actions">
          <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-register" onClick={() => navigate('/register')}>Register</button>
        </div>
      )}

      {/* En Login/Register (isAuth), no se renderiza ni navbar-links ni navbar-actions */}
    </nav>
  );
};

export default Navbar;
