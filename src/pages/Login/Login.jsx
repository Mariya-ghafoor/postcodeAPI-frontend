import * as yup from "yup";
import { useContext, useState } from "react";
import { login, registerUser } from "../../services/userService";
import Cookies from "universal-cookie";
import styles from "./Login.module.scss";
import { motion } from "framer-motion";

function Login() {
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  const [accessToken, setAccessToken] = new useState(null);

  const divVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  const schema = yup.object({
    username: yup.string().required("Please enter a username"),
    password: yup
      .string()
      .required("Please enter a password")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(formData);

    schema
      .validate(formData, { abortEarly: false })
      .then((formData) => {
        loginUser(formData);
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

  const loginUser = (formData) => {
    login(formData)
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
        setAccessToken(cookies.get("access_token"));
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={divVariants}
      className={styles.main}
    >
      <h2>Login to add new postcodes</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" className={styles.input__field} name="username" />
          {errors.username && (
            <p className={styles.errors}>{errors.username}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className={styles.input__field}
            name="password"
          />
          {errors.password && (
            <p className={styles.errors}>{errors.password}</p>
          )}
        </div>

        <button className={styles.submit__button}>Submit</button>
      </form>
      {accessToken && (
        <div>
          You have registered successfully! Add a new postcode{" "}
          <a href="/add_postcode">here</a>
        </div>
      )}
    </motion.div>
  );
}

export default Login;
