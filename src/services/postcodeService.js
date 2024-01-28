import Cookies from "universal-cookie";
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
export const addNewPostcode = async (postcode) => {
  const cookies = new Cookies();
  const token = await cookies.get("access_token");
  console.log("Got cookies: ", token);

  const response = await fetch("http://localhost:3306/postcodes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    //credentials: "same-origin",
    //withCredentials: true,
    body: JSON.stringify(postcode),
  });
  console.log("response: ", response);

  if (response.status == 409) {
    const error = {
      status: "409",
      message: `Postcode already exists`,
    };
    return error;
  }
  if (response.status == 500) {
    const error = {
      status: "500",
      message: "An error occured. Please try again",
    };
    return error;
  }
  return response;
};
