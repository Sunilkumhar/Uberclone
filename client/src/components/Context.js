import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [source, setSource] = useState("Enter pickup location");
  const [destination, setDestination] = useState("Enter destination");

  return (
    <UserContext.Provider
      value={{
        source1: [source, setSource],
        destination1: [destination, setDestination],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
