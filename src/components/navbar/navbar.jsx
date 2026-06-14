import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img 
          src="https://i.postimg.cc/Nf66Y8y6/logo.png" 
          alt="Hospedar Logo" 
          className="navbar-logo-img" 
        />
        <span className="navbar-brand-name">Hospedar</span>
      </div>

      <ul className="navbar-links">
        <li><a href="#buscar">Buscar Hospedaje</a></li>
        <li><a href="#reservas">Reservas</a></li>
        <li><a href="#usuario">Usuario</a></li>
        <li><a href="#configuracion">Configuración</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
      </ul>

      <div className="navbar-actions">
        <button className="btn-login">Login</button>
        <button className="btn-register">Register</button>
        <button className="btn-logout">Salir</button>
      </div>
    </nav>
  );
};

export default Navbar;
