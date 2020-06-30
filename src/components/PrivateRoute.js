import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "./../context/user";

const PrivateRoute = ({ component: Checkout, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => {
        return user.token ? <Checkout /> : <Redirect to="/Login" />;
      }}
    />
  );
};

export default PrivateRoute;
