import { useState } from "react";
import styles from "./SearchPostcode.module.scss";
function SearchPostcode() {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchCategory, setSearchCategory] = useState(null);

  const formOnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[2].value);
    setSearchTerm(e.target[0].value);
    setSearchCategory(e.target[2].value);
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
    </div>
  );
}

export default SearchPostcode;
