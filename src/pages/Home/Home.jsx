import styles from "./Home.module.scss";
import SearchPostcode from "../../components/SearchPostcode/SearchPostcode";
import { useEffect, useState } from "react";

import ViewPostcodes from "../../components/ViewPostcodes/ViewPostcodes";
import Auth from "../../components/Auth/Auth";

function Home() {
  const [postcodes, setPostcodes] = useState([]);
  const [showSection, setShowSection] = useState(null);

  const tableVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  };

  return (
    <div className={styles.main}>
      <div className={styles.heading}>
        <h1>Postcode API</h1>
        <div className={styles.button__options}>
          <button
            className={styles.button__home}
            onClick={() => {
              setShowSection("view");
            }}
          >
            View
          </button>

          <button
            className={styles.button__home}
            onClick={() => {
              setShowSection("search");
            }}
          >
            Search
          </button>

          <button
            className={styles.button__home}
            onClick={() => {
              setShowSection("add");
            }}
          >
            Add
          </button>
        </div>
      </div>
      {showSection === "search" && <SearchPostcode />}

      {showSection === "view" && <ViewPostcodes />}

      {showSection === "add" && <Auth />}
    </div>
  );
}

export default Home;
