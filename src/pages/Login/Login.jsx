import * as yup from "yup";
import { useContext, useState } from "react";
import { login, registerUser } from "../../services/userService";
import Cookies from "universal-cookie";
import styles from "./Login.module.scss";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { UserLoginContext } from "../../context/UserLoginContextProvider/UserLoginContextProvider";

function Login() {
  const { setIsLoggedIn } = useContext(UserLoginContext);

  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });

  const [serverError, setServerError] = new useState(null);
  const [loginSuccess, setLoginSuccess] = new useState(false);

  const navigate = useNavigate();

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

    //Resetting the form
    e.target.username.value = "";
    e.target.password.value = "";

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

  const redirectToAddPostcode = () => {
    setTimeout(() => {
      navigate("/add_postcode");
    }, 2000);
  };

  const loginUser = (formData) => {
    login(formData)
      .then((response) => {
        if (response.ok) {
          console.log("response is ok");
          return response.json();
        } else {
          setServerError(response.message);
        }
      })
      .then((data) => {
        const cookies = new Cookies();
        console.log("response ", data);
        cookies.set("access_token", data.token, {
          path: "/",
          // httpOnly: true,
          // secure: true,
          //expires: new Date(Date.now()),
        });
        setServerError(null);
        setLoginSuccess(true);
        setIsLoggedIn(true);
        redirectToAddPostcode();
      });
  };
  const loginUser1 = (formData) => {
    login(formData)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();

        // if (response.status == 400)
        //   setServerError("Either User does not exist or password is wrong");
        // if (response.status == 200) {
        //   const data = response.json();
        //   const cookies = new Cookies();
        //   console.log("response ", data);
        //   cookies.set("access_token", data.token, {
        //     path: "/",
        //     // httpOnly: true,
        //     // secure: true,
        //     //expires: new Date(Date.now()),
        //   });
        //   setServerError(false);
        //   setLoginSuccess(true);
        //   redirectToAddPostcode();
        // } else console.log("an error has occured");
      })
      .then((data) => {
        const cookies = new Cookies();
        console.log("response ", data);
        cookies.set("access_token", data.token, {
          path: "/",
          // httpOnly: true,
          // secure: true,
          //expires: new Date(Date.now()),
        });
        setServerError(null);
        setLoginSuccess(true);
        redirectToAddPostcode();
      })
      .catch((err) => {
        console.log("error: ", err);
        if (err == 400)
          setServerError("Either User does not exist or password is wrong");
        else setServerError("An error occured. Please try again");
      });
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
      {loginSuccess === true && (
        <div>You have logged in successfully! Redirecting to postcode page</div>
      )}
      {serverError && <p>{serverError}</p>}
    </motion.div>
  );
}

export default Login;
