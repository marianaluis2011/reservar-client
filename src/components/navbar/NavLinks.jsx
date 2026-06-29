import { navLinks } from "./navbarData";

const NavLinks = ({
  navigate,
  mobile = false,
  closeMenu = () => {},
}) => {
  return (
    <>
      {mobile ? (
        <>
          {navLinks.map((item) => (
            <li
              key={item.path}
              onClick={() => {
                navigate(item.path);
                closeMenu();
              }}
            >
              {item.label}
            </li>
          ))}
        </>
      ) : (
        <ul className="navbar-links">
          {navLinks.map((item) => (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavLinks;