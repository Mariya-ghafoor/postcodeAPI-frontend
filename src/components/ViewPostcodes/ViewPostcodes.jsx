import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAllPostcodes } from "../../services/postcodeService";

function ViewPostcodes() {
  const [postcodes, setPostcodes] = useState([]);

  const tableVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
  };

  // const onSeeAllClick = () => {
  //   setErrorMessage(null);
  //   setSearchResult(null);
  //   getAllPostcodes().then((response) => {
  //     setPostcodes(response);
  //   });
  // };

  useEffect(() => {
    viewPostcodesList();
  }, []);

  const viewPostcodesList = () => {
    getAllPostcodes()
      .then((response) => {
        setPostcodes(response);
      })
      .catch((e) => console.log("an error occured ", e));
  };

  return (
    <div>
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

export default ViewPostcodes;
