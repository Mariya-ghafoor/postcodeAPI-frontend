import * as yup from "yup";
import { useContext, useState } from "react";
import { login, registerUser } from "../../services/userService";
import styles from "./Register.module.scss";
import Cookies from "universal-cookie";
import { JwtContext } from "../../context/JwtContextProvider/JwtContextProvider";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });

  const { jwt, setJwt } = useContext(JwtContext);

  const navigate = useNavigate();

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

  const redirectToAddPostcode = () => {
    setTimeout(() => {
      if (registerSuccess) navigate("/add_postcode");
    }, 2000);
  };

  const registerNewUser = (formData) => {
    registerUser(formData)
      .then((response) => {
        console.log("reponse: ", response.token);

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
        if (cookies.get("access_token")) {
          setRegisterSuccess(true);
          redirectToAddPostcode();
        }
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <div className={styles.main}>
      <h2>Register to add new postcodes</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form__field}>
          <label className={styles.label}>Username</label>
          <input className={styles.input__field} type="text" name="username" />
        </div>
        {errors.username && <p className={styles.errors}>{errors.username}</p>}

        <div className={styles.form__field}>
          <label className={styles.label}>Email</label>
          <input className={styles.input__field} type="email" name="email" />
        </div>
        {errors.email && <p className={styles.errors}>{errors.email}</p>}

        <div className={styles.form__field}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.input__field}
            type="password"
            name="password"
          />
        </div>
        {errors.password && <p className={styles.errors}>{errors.password}</p>}

        <button className={styles.submit__button}>Submit</button>
      </form>
      {jwt && (
        <div>
          You have registered successfully! Add a new postcode{" "}
          <a href="/add_postcode">here</a>
        </div>
      )}

      {registerSuccess && (
        <p>You have registered successfully. Redirecting to postcode page</p>
      )}
    </div>
  );
}

export default Register;
