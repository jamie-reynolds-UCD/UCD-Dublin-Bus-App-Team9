import React from "react";

const QuickLocationContext = React.createContext({
  latitude: null,
  longitude: null,
  address_string: null,
});

export const QuickLocationContextProvider = QuickLocationContext.Provider;

export default QuickLocationContext;
