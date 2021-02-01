import React from "react";

export const UserContext = React.createContext({
  username: "Guest",
  role: "guest",
  isAtuhenticated: false,
  login: () => {},
  logout: () => {},
});
