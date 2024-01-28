import { useEffect, useState } from "react";
import * as yup from "yup";
import { addNewPostcode } from "../../services/postcodeService";
import styles from "./AddPostcode.module.scss";
import { motion } from "framer-motion";

function AddPostcode() {
  const [errors, setErrors] = useState({
    postcode: null,
    suburb: null,
  });

  const [postcodeSuccess, setPostcodeSuccess] = useState(false);
  const [serverError, setServerError] = useState(null);

  const divVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  const schema = yup.object({
    postcode: yup
      .string()
      .required("Please enter a postcode")
      .min(4, "Postcode must be of minimum 4 digits"),

    suburb: yup
      .string()
      .required("Suburb is required")
      .matches(/^[a-zA-Z ]*$/, "Please enter a valid suburb name"),
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      postcode: e.target.postcode.value,
      suburb: e.target.suburb.value,
    };
    schema
      .validate(formData, { abortEarly: false })
      .then((formData) => {
        console.log("form data: ", formData);
        addPostcode(formData);
        setPostcodeSuccess(true);
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

  const addPostcode = (formData) => {
    addNewPostcode(formData)
      .then((response) => {
        if (response.ok) {
          console.log("reponse is ok: ", response);
          setServerError(null);
          setPostcodeSuccess(true);
        } else {
          setPostcodeSuccess(null);
          setServerError(response.message);
        }
      })
      .catch((e) => console.log("An error occured, ", e));
  };
  return (
    <motion.div
      className={styles.main}
      initial="hidden"
      animate="visible"
      variants={divVariants}
    >
      <h2>Add a new Postcode</h2>
      <form className={styles.form} onSubmit={onFormSubmit}>
        <div className={styles.form__field}>
          <label className={styles.label}>Postcode</label>
          <input className={styles.input__field} type="text" name="postcode" />
          {errors.postcode && <p>{errors.postcode}</p>}
        </div>

        <div className={styles.form__field}>
          <label className={styles.label}>Suburb</label>
          <input className={styles.input__field} type="text" name="suburb" />
          {errors.suburb && <p>{errors.suburb}</p>}
        </div>

        <button className={styles.submit__button}>Submit</button>
      </form>
      {postcodeSuccess === true && <p>Postcode added successfully</p>}
      {serverError && <p>{serverError}</p>}
    </motion.div>
  );
}

export default AddPostcode;
