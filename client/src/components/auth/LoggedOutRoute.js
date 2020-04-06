import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function LoggedOutRoute(props) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Route {...props} />;
  } else if (isLoggedIn) {
    return (
      <Route {...props}>
        <Redirect to="/" />
      </Route>
    );
  }
}

export default LoggedOutRoute;
