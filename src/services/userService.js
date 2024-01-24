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

  return response.json();
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
  return response.json();
};
