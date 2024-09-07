import React, { createContext, useState } from "react";
import { initialData } from "../constants";

const DataContext = createContext({});

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const updateData = (shift, machine, key, value) => {
    setData((prevState) => {
      return {
        ...prevState,
        [shift]: {
          ...prevState[shift],
          [machine]: {
            ...prevState[shift][machine],
            [key]: value,
          },
        },
      };
    });
  };

  const updateStore = (value) => {
    setData(() => value);
  };

  const updateDate = (value) => {
    setData((prevState) => {
      return {
        ...prevState,
        date: value,
      };
    });
  };
  const updatePrice = (shift, key, value) => {
    setData((prevState) => {
      return {
        ...prevState,
        [shift]: {
          ...prevState[shift],
          [key]: value,
        },
      };
    });
  };

  const contextValue = {
    data,
    updateData,
    updatePrice,
    updateDate,
    updateStore,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataProvider };
