import Cookies from "universal-cookie";

// Register a user

export const registerUser = async (newUserData) => {
  const response = await fetch("http://localhost:3306/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  });

  return response.json();
};

export const login = async (userData) => {
  const cookies = new Cookies();
  //const token = await cookies.get("access_token");
  console.log("token: ", cookies);
  const response = await fetch("http://localhost:3306/auth/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      // Authorization: `Bearer ${token}`, // notice the Bearer before your token
      // Authorization: `${token}`,
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};
