import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

const MobileMenu = ({
  open,
  showNavigationLinks,
  isHome,
  isAuthenticated,
  user,
  navigate,
  logout,
  closeMenu,
}) => {
  if (!open) return null;

  return (
    <div className="mobile-menu">

      {showNavigationLinks && (
        <NavLinks
          navigate={navigate}
          mobile
          closeMenu={closeMenu}
        />
      )}

      {isHome && !isAuthenticated && (
        <>
          <button
            onClick={() => {
              navigate("/login");
              closeMenu();
            }}
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => {
              navigate("/register");
              closeMenu();
            }}
          >
            Registrarse
          </button>
        </>
      )}

      {isAuthenticated && (user?.role === "host" || user?.role === "super_admin") && (
        <button
          onClick={() => {
            navigate(user.role === "super_admin" ? "/host/superAdmin" : "/host/dashboard");
            closeMenu();
          }}
        >
          Mi panel
        </button>
      )}

      {isAuthenticated && user?.role === "guest" && (
        <button
          onClick={() => {
            navigate("/myBooking");
            closeMenu();
          }}
        >
          Mis reservas
        </button>
      )}

      {isAuthenticated && (
        <UserMenu
          mobile
          user={user}
          navigate={navigate}
          logout={logout}
          closeMenu={closeMenu}
        />
      )}

    </div>
  );
};

export default MobileMenu;