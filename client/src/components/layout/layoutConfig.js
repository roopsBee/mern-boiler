import HomeIcon from "@material-ui/icons/Home";
import React from "react";

export const drawerLinks = [
  {
    icon: <HomeIcon />,
    primary: "Home",
    to: "/"
  },
  {
    icon: <HomeIcon />,
    primary: "Register",
    to: "/auth/register"
  },
  {
    icon: <HomeIcon />,
    primary: "Login",
    to: "/auth/login"
  }
];

export const appName = "My Apps";
