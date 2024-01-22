// Get list of all postcodes

export const getAllPostcodes = async () => {
  const response = await fetch("http://localhost:3306/postcodes");
  const data = await response.json();
  return data;
};

// Search for postcode from postcode
export const getSuburbFromPostcode = async (postcode) => {
  //console.log("received: ", typeof postcode);
  const response = await fetch(
    `http://localhost:3306/postcodes/query?postcode=${postcode}`
  );

  console.log("response ", response.status);
  if (response.status == "404") {
    const error = {
      status: "404",
      message: `Suburb with postcode ${postcode} does not exist`,
    };
    return error;
  }

  if (response.status == "400") {
    const error = {
      status: "400",
      message: `Please enter valid postcode`,
    };
    return error;
  }

  const data = await response.json();
  console.log(data);
  return data;
};

// Search for postcode from suburb
export const getPostcodeFromSuburb = async (suburb) => {
  //console.log("received: ", typeof postcode);
  const response = await fetch(
    `http://localhost:3306/postcodes/query?suburb=${suburb}`
  );
  console.log("response ", response.status);
  if (response.status == "404") {
    const error = {
      status: "404",
      message: `Postcode with Suburb ${suburb} does not exist`,
    };
    return error;
  }

  if (response.status == "400") {
    const error = {
      status: "400",
      message: `Please enter valid suburb name`,
    };
    return error;
  }

  const data = await response.json();
  console.log(data);
  return data;
};

// create a new postcode
// export const addNewPostcode = async (postcode) => {
//   const response = await fetch("http://localhost:3306/postcodes");
//   const data = await response.json();
//   return data;
// };