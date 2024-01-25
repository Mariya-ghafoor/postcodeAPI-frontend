import { useEffect, useState } from "react";
import * as yup from "yup";
import { addNewPostcode } from "../../services/postcodeService";
import styles from "./AddPostcode.module.scss";

function AddPostcode() {
  const [errors, setErrors] = useState({
    postcode: null,
    suburb: null,
  });

  const [postcodeSuccess, setPostcodeSuccess] = useState(false);

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
    addNewPostcode(formData).then((response) =>
      console.log("After adding new postcode ", response)
    );
  };
  return (
    <div className={styles.main}>
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
    </div>
  );
}

export default AddPostcode;
