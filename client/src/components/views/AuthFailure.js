import React from "react";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alerts";

function AuthFailure() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAlert("Login Has Failed.", "error"));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Redirect to="/auth/login" />
    </div>
  );
}

export default AuthFailure;
