import { useState } from "react";
import * as yup from "yup";

function AddPostcode() {
  const [errors, setErrors] = useState({
    postcode: null,
    suburb: null,
  });

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
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div>
          <label>Postcode</label>
          <input type="text" name="postcode" />
          {errors.postcode && <p>{errors.postcode}</p>}
        </div>

        <div>
          <label>Suburb</label>
          <input type="text" name="suburb" />
          {errors.suburb && <p>{errors.suburb}</p>}
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddPostcode;
