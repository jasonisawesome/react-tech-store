// user context
import React, { useState } from "react";

 export const UserContext = React.createContext();

export function getUserFromLocal() {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, token: null };
}

export const UserProvider = ({ children }) => {
  //   const [user, setUser] = useState({ usename: null, token: null });
  const [user, setUser] = useState(getUserFromLocal());
  // alert
  const [alert, setAlert] = useState({ show: false, msg: "", type: "success" });

  const showAlert = ({ type = "success", msg }) => {
    setAlert({ show: true, msg, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, userLogin, userLogout, alert, showAlert, hideAlert }}
    >
      {children}
    </UserContext.Provider>
  );
};


