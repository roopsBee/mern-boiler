import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { logOut } from "../../actions/auth";
import store from "../../store";
import api from "../../api/api";

// render side bar links for Layout
// {[icon:component], name:string, [to:string], [onClick:function]}
export const drawerLinks = [
  {
    icon: <HomeIcon />,
    name: "Home",
    to: "/"
  },
  {
    icon: <HomeIcon />,
    name: "Register",
    to: "/auth/register"
  },
  {
    icon: <HomeIcon />,
    name: "Login",
    to: "/auth/login"
  },
  {
    name: "Logout",
    onClick: () => {
      store.dispatch(logOut());
    }
  },
  {
    name: "private",
    to: "/private",
    onClick: () => {
      api.get("/private").then(res => console.log(res));
    }
  }
];

export const appName = "My Apps";
