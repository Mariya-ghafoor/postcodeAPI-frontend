/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./SearchPostcode.module.scss";
import {
  getPostcodeFromSuburb,
  getSuburbFromPostcode,
} from "../../services/postcodeService";

function SearchPostcode({ showSearchResult }) {
  const [searchTerm, setSearchTerm] = useState(null);
  //const [postcode, setPostcode] = useState([]);
  const [searchCategory, setSearchCategory] = useState(null);
  // const [error, setError] = useState(null);

  const formOnSubmit = (e) => {
    e.preventDefault();
    const inputText = e.target[0].value;
    setSearchTerm(inputText);
    e.target[0].value = "";
    setSearchCategory(e.target[2].value);
  };

  useEffect(() => {
    // if (searchCategory === "postcode" && typeof searchTerm != "number") {
    //   console.log("wrong search term");
    //   showSearchResult({
    //     status: "400",
    //     message: "Please enter valid postcode",
    //   });
    //   return;
    // }

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

  return (
    <div>
      <form className={styles.form} onSubmit={formOnSubmit}>
        <div>
          <input type="text" />
          <button>Search</button>
        </div>
        <div>
          <select defaultValue="postcode">
            <option value="postcode">Search by postcode</option>
            <option value="suburb">Search by suburb</option>
          </select>
        </div>
      </form>

      {/* {error && <div>{error}</div>} */}
    </div>
  );
}

export default SearchPostcode;
