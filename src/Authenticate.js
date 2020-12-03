import React from "react";
import { Route, Redirect } from "react-router-dom";

const Authenticated = ({ component: Component, path, ...rest }) => {
  const token = localStorage.getItem("token");
  const checkUserAndRedirect = (props) => {
    if (token) {
      return <Component {...props} />;
    } else {
      return (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      );
    }
  };

  return (
    <Route
      exact
      path={path}
      {...rest}
      render={(props) => checkUserAndRedirect(props)}
    />
  );
};

export default Authenticated;
