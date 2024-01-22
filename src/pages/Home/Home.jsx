import styles from "./Home.module.scss";
import SearchPostcode from "../../components/SearchPostcode/SearchPostcode";
import { useEffect, useState } from "react";
import { getAllPostcodes } from "../../services/postcodeService";
import { motion } from "framer-motion";

function Home() {
  const [postcodes, setPostcodes] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  useEffect(() => {
    console.log("new postcode data receieved: ", searchResult);
  }, [searchResult]);

  const tableVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  };

  const onSeeAllClick = () => {
    setErrorMessage(null);
    setSearchResult(null);
    getAllPostcodes().then((response) => {
      setPostcodes(response);
    });
  };
  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>Postcode API</h1>
        <h3>
          Search and add postcodes or{" "}
          <span className={styles.see__all} onClick={onSeeAllClick}>
            see all
          </span>
        </h3>
      </div>
      <SearchPostcode showSearchResult={showSearchResult} />

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

      {errorMessage && <div>hello{errorMessage}</div> && (
        <p>
          Postcode missing? <a href="">Sign in</a> or{" "}
          <a href="/register">Register</a> to add to the list
        </p>
      )}

      {postcodes.length > 0 && (
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

            {postcodes.map((postcode) => {
              return (
                <tr key={postcode.id}>
                  <td>{postcode.id}</td>
                  <td>{postcode.postcode}</td>
                  <td>{postcode.suburb}</td>
                </tr>
              );
            })}
          </tbody>
        </motion.table>
      )}
    </div>
  );
}

export default Home;
