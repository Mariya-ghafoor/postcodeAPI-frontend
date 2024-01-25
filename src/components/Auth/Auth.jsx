import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Auth() {
  const [loginRequired, setLoginRequired] = useState(false);
  const navigate = useNavigate();

  // check if user is logged in. If not then ask them to login
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("access_token");
    console.log("token: ", token);
    if (!token) setLoginRequired(true);
    else navigate("/add_postcode");
  }, []);

  return (
    <>
      {loginRequired && (
        <p>
          Please <a href="/register">register</a> or <a href="/login">login</a>{" "}
          to add a postcode
        </p>
      )}
    </>
  );
}

export default Auth;
