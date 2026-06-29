import { userLinks } from "./navbarData";

const UserMenu = ({
  user,
  navigate,
  logout,
  mobile = false,
  closeMenu = () => {},
}) => {
  const userName = user?.fullName || user?.name || user?.email || "Usuario";

  const handleClick = (path) => {
    navigate(path);
    closeMenu();
  };

  if (mobile) {
    return (
      <>
        <div className="mobile-user-info">
          <strong>{userName}</strong>
          <small>{user?.email}</small>
        </div>

        {userLinks.map((item) => (
          <button
            key={item.path}
            onClick={() => handleClick(item.path)}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={() => {
            logout();
            closeMenu();
          }}
        >
          Cerrar Sesión
        </button>
      </>
    );
  }

  return (
    <div className="user-menu">
      <p className="text-sm">{userName}</p>

      <p className="text-xs">{user?.email}</p>

      <hr />

      {userLinks.map((item) => (
        <button
          key={item.path}
          onClick={() => handleClick(item.path)}
        >
          {item.label}
        </button>
      ))}

      <hr />

      <button
        onClick={() => {
          logout();
          closeMenu();
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserMenu;