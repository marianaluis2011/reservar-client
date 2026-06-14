import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './../components/button'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { to: '/', label: 'Inicio', icon: '🏠' },
    { to: '/hospedajes', label: 'Hospedajes', icon: '🏨' },
  ]

  return (
    <>
      <nav className="navbar" aria-label="Barra de navegación principal">

        {/* Logo / Brand */}
        <NavLink to="/" className="navbar__brand" onClick={closeMenu} aria-label="Ir al inicio">
          <span className="navbar__logo-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 9.5V22h7v-6h6v6h7V9.5L12 2z" />
            </svg>
          </span>
          <span className="navbar__brand-name">Reservar</span>
        </NavLink>

        {}
        <ul className="navbar__links" role="list">
          {navLinks.map(({ to, label }) => (
            <li key={to} className="navbar__link-item">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {}
        <div className="navbar__actions">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `navbar__btn navbar__btn--login${isActive ? ' navbar__link--active' : ''}`
            }
          >
            Iniciar sesión
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `navbar__btn navbar__btn--register${isActive ? ' navbar__link--active' : ''}`
            }
          >
            Registrarse
          </NavLink>
        </div>

        {/* Hamburger — mobile */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="navbar-mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </nav>

      {}
      <div
        id="navbar-mobile-menu"
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
        role="navigation"
        aria-label="Menú móvil"
      >
        <ul className="navbar__mobile-links" role="list">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className="navbar__mobile-link"
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__mobile-actions">
          <NavLink
            to="/login"
            className="navbar__mobile-btn navbar__mobile-btn--login"
            onClick={closeMenu}
          >
            Iniciar sesión
          </NavLink>
          <NavLink
            to="/register"
            className="navbar__mobile-btn navbar__mobile-btn--register"
            onClick={closeMenu}
          >
            Registrarse
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Navbar

