/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const JwtContext = createContext(null);

function JwtContextProvider({ children }) {
  const [jwt, setJwt] = useState(null);
  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
}

export default JwtContextProvider;
