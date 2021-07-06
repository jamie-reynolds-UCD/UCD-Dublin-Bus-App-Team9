import React from "react";

const AuthContext = React.createContext({
  loggedin: false,
  userid: null,
  updatecredentials: null,
});

export const AuthContextProvider = AuthContext.Provider;

export default AuthContext;
