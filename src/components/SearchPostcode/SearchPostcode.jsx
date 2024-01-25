/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./SearchPostcode.module.scss";
import {
  getPostcodeFromSuburb,
  getSuburbFromPostcode,
} from "../../services/postcodeService";
import { motion } from "framer-motion";

function SearchPostcode() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [postcodes, setPostcodes] = useState([]);

  const tableVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  };

  const formOnSubmit = (e) => {
    e.preventDefault();
    // const inputText = e.target[0].value;
    const inputText = e.target.inputText.value;
    setSearchTerm(inputText);
    //e.target[0].value = "";
    e.target.inputText.value = "";
    // setSearchCategory(e.target[2].value);
    setSearchCategory(e.target.searchCategory.value);
  };

  useEffect(() => {
    if (searchTerm != null) {
      console.log("search term is: ", searchTerm);
      switch (searchCategory) {
        case "postcode":
          searchByPostcode();
          break;
        case "suburb":
          searchBySuburb();
          break;
      }
    }
  }, [searchTerm]);

  const searchByPostcode = async () => {
    const results = await getSuburbFromPostcode(searchTerm);
    console.log("in search func. results= ", results);
    //setPostcode(results);
    showSearchResult(results);
  };

  const searchBySuburb = async () => {
    console.log("search by suburb ", searchTerm);
    const results = await getPostcodeFromSuburb(searchTerm);

    showSearchResult(results);
    console.log("search by suburb");
  };

  const showSearchResult = (postcode) => {
    console.log("in home func ", postcode);
    if (postcode.status === "404") {
      console.log("caught error 404");
      setPostcodes([]);
      setErrorMessage(() => postcode.message);
      console.log("error is ", errorMessage);
    } else if (postcode.status === "400") {
      console.log("caught error 400");
      setPostcodes([]);
      setErrorMessage(() => postcode.message);
      console.log("error is ", errorMessage);
    } else {
      setErrorMessage(null);
      setSearchResult(postcode);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={tableVariants}>
      <form className={styles.form} onSubmit={formOnSubmit}>
        <input className={styles.inputField} type="text" name="inputText" />
        <div className={styles.search__buttons}>
          <div>
            <select
              className={styles.dropdown}
              defaultValue="postcode"
              name="searchCategory"
            >
              <option value="postcode">Search by postcode</option>
              <option value="suburb">Search by suburb</option>
            </select>
          </div>
          <div className={styles.button}>
            <button>Search</button>
          </div>
        </div>
      </form>

      {searchResult && (
        <motion.table
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <tbody>
            <tr>
              <th>Sr.no.</th>
              <th>Postcode</th>
              <th>Suburb</th>
            </tr>

            <tr key={searchResult.id}>
              <td>{searchResult.id}</td>
              <td>{searchResult.postcode}</td>
              <td>{searchResult.suburb}</td>
            </tr>
          </tbody>
        </motion.table>
      )}
      {errorMessage && <div>{errorMessage}</div>}

      {errorMessage && <div>{errorMessage}</div> && (
        <p>
          Postcode missing? <a href="">Sign in</a> or{" "}
          <a href="/register">Register</a> to add to the list
        </p>
      )}
    </motion.div>
  );
}

export default SearchPostcode;
