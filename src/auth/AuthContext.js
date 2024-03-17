import { createContext } from "react";
const AuthContext = createContext({
  currentUser: null,
  // isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
