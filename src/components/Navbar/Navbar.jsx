import { useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import { UserLoginContext } from "../../context/UserLoginContextProvider/UserLoginContextProvider";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserLoginContext);

  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("access_token")) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [isLoggedIn]);

  const onLogoutClick = () => {
    const currentDate = new Date(Date.now());
    console.log(currentDate.getTime());

    cookies.set("access_token", "", {
      path: "/",
      expires: new Date(Date.now()),
    });
    console.log("cookie expired");
    setIsLoggedIn(false);
  };
  return (
    <div className={styles.navbar}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoggedIn ? (
        <li>
          <NavLink to="/" onClick={onLogoutClick}>
            Logout
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink
            to={{
              pathname: "/login",
              state: { isLoggedIn },
            }}
          >
            Login
          </NavLink>
        </li>
      )}
      {/* <button>Home</button>
      <button onClick={onLoginClick}>Login</button>
      <button onClick={onLogoutClick}>Logout</button> */}
    </div>
  );
};

export default Navbar;
