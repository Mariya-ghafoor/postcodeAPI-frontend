import styles from "./Home.module.scss";
import SearchPostcode from "../../components/SearchPostcode/SearchPostcode";

function Home() {
  return (
    <div className={styles.main}>
      <div>
        <h1>Postcode API</h1>
        <h3>Search and add postcodes</h3>
      </div>
      <SearchPostcode />
    </div>
  );
}

export default Home;
