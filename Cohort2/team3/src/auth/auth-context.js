import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {},
  base_url: "", //api url
  homepage_url: "" //frontend homepage
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [userId, setUserId] = useState();
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  const loginHandler = (userId, token) => {
    setUserId(userId);
    setToken(token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };

  const base_url = "http://localhost:8000"
  const homepage_url = "http://localhost:3000"
  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    base_url: base_url,
    homepage_url
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;