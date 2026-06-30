import { userLinks } from "./navbarData";
import { toast } from "sonner";

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

  const handleLogout = () => {
    closeMenu();
    toast("¿Estás seguro que querés cerrar sesión?", {
      action: {
        label: "Sí, salir",
        onClick: () => {
          logout();
          navigate("/");
          toast.success("Sesión cerrada");
        },
      },
      cancel: { label: "Cancelar" },
    });
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

        <button onClick={handleLogout}>
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

      <button onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default UserMenu;