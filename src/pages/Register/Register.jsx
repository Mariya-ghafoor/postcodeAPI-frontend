import * as yup from "yup";
import { useState } from "react";
import { registerUser } from "../../services/userService";
import Cookies from "universal-cookie";

function Register() {
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });

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

  const registerNewUser = async (formData) => {
    const cookies = new Cookies();
    const response = await registerUser(formData);
    console.log("response receieved: ", response);
    const accessToken = await response.token;
    console.log("Token: ", accessToken);
    if (accessToken) {
      cookies.set("access_token", accessToken, {
        path: "/",
        httpOnly: true,
        secure: true,
      });
      setAccessToken((oldToken) => (oldToken = cookies.getAll));
      console.log("Access token", accessToken);
    }
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
      {accessToken && (
        <div>
          You have registered successfully! Add a new postcode{" "}
          <a href="/add_postcode">here</a>
        </div>
      )}
    </div>
  );
}

export default Register;
