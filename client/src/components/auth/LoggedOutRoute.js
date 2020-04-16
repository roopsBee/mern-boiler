import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LoggedOutRoute(props) {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let { from } = location.state || { from: { pathname: "/" } };

  if (!isLoggedIn) {
    return <Route {...props} />;
  } else if (isLoggedIn) {
    return (
      <Route {...props}>
        <Redirect to={{ from }} />
      </Route>
    );
  }
}

export default LoggedOutRoute;
