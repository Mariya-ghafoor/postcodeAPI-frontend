/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const UserLoginContext = createContext(null);

function UserLoginContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserLoginContext.Provider>
  );
}

export default UserLoginContextProvider;
