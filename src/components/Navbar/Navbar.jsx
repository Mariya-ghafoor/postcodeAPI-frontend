import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate("/login");
  };
  const onLogoutClick = () => {
    const cookies = new Cookies();
    const currentDate = new Date(Date.now());
    console.log(currentDate.getTime());

    cookies.set("access_token", "", {
      path: "/",
      expires: new Date(Date.now()),
    });
    console.log("cookie expired");
  };
  return (
    <div>
      <button onClick={onLoginClick}>Login</button>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

export default Navbar;
