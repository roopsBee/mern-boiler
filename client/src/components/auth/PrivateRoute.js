import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component, ...props }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Route component={component} {...props} />;
  } else {
    return (
      <Route {...props}>
        <Redirect
          to={{
            pathname: "/auth/login",
            state: { from: props.path },
          }}
        />
      </Route>
    );
  }
};

export default PrivateRoute;
