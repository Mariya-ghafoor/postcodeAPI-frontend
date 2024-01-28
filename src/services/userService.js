import Cookies from "universal-cookie";

// Register a user

export const registerUser = async (newUserData) => {
  const response = await fetch("http://localhost:3306/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //credentials: "same-origin",
    body: JSON.stringify(newUserData),
  });

  if (response.status == 400 || response.status == 500) {
    const error = {
      status: "400",
      message: "User already exists",
    };
    return error;
  }

  return response;
};

export const login = async (userData) => {
  const response = await fetch("http://localhost:3306/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    //mode: "no-cors", // 'cors' by default
    credentials: "same-origin",
    // withCredentials: true,
    body: JSON.stringify(userData),
  });

  if (response.status == 400) {
    const error = {
      status: "400",
      message: "Either User does not exist or password is wrong",
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
