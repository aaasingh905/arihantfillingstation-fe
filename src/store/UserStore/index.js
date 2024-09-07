import React, { createContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: "",
  });

  const updateUserStore = (value) => {
    setUser((prevState) => {
      return { ...prevState, ...value };
    });
  };

  const contextValue = {
    user,
    updateUserStore,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
