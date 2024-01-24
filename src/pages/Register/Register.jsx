import * as yup from "yup";
import { useContext, useState } from "react";
import { login, registerUser } from "../../services/userService";
import Cookies from "universal-cookie";
import { JwtContext } from "../../context/JwtContextProvider/JwtContextProvider";

function Register() {
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });

  const { jwt, setJwt } = useContext(JwtContext);

  const [accessToken, setAccessToken] = new useState(null);

  const schema = yup.object({
    username: yup.string().required("Please enter a username"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    password: yup
      .string()
      .required("Please enter a password")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(formData);

    schema
      .validate(formData, { abortEarly: false })
      .then((formData) => {
        registerNewUser(formData);
      })
      .catch(function (err) {
        err.inner.forEach((e) => {
          console.log(e.message, e.path);
          let field = e.path;
          let message = e.message;
          setErrors((prevState) => ({
            ...prevState,
            [field]: message,
          }));
          console.log("Errors: ", errors);
        });
      });
  };

  const registerNewUser = (formData) => {
    // const cookies = new Cookies();
    //CHANGE TO REGISTER
    //const response = await login(formData);
    registerUser(formData)
      .then((response) => {
        console.log("reponse: ", response);

        const cookies = new Cookies();
        if (response) {
          cookies.set("access_token", response.token, {
            path: "/",
            // httpOnly: true,
            // secure: true,
            //expires: new Date(Date.now()),
          });
        }
        console.log("cookies: ", cookies.get("access_token"));
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <div>
      <h2>Register to add new postcodes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button>Submit</button>
      </form>
      {jwt && (
        <div>
          You have registered successfully! Add a new postcode{" "}
          <a href="/add_postcode">here</a>
        </div>
      )}
    </div>
  );
}

export default Register;
