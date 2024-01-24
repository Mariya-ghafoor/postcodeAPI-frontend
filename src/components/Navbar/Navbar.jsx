import Cookies from "universal-cookie";

const Navbar = () => {
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
      <button>Login</button>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

export default Navbar;
