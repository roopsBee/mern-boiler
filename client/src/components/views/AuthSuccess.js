import React from "react";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alerts";

function AuthSuccess() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAlert("Login Successful", "success"));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
}

export default AuthSuccess;
