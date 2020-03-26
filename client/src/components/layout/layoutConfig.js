import HomeIcon from "@material-ui/icons/Home";
import React from "react";

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
  }
];

export const appName = "My Apps";
